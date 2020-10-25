import logging
import time

callbacks = set()


def timeit(method):
    def timed(*args, **kw):
        ts = time.time()
        result = method(*args, **kw)
        te = time.time()
        return result, te - ts

    return timed


class LogManager(object):
    def __init__(self, log_path):
        self.log_path = log_path
        self.log_keys = []
        self.logs = []

    def push(self, log_dict):
        if not self.log_keys:
            self.log_keys = sorted(list(log_dict.keys()))
            with open(self.log_path, "w+") as f:
                f.write(self._get_list_as_csv_line(self.log_keys))
        if len(self.log_keys) != len(log_dict):
            raise ValueError("log_keys not the same size as log_dict")

        with open(self.log_path, "a") as f:
            line = self._get_list_as_csv_line([log_dict[key] for key in self.log_keys])
            f.write(line)
            logging.info(line)

    @staticmethod
    def _get_list_as_csv_line(list_):
        return "\t".join([str(item) for item in list_ + ["\n"]])


callback_log_manager = LogManager("callbacks.csv")


def set_callback(model, attr_name, callback):
    callback_log_dict = {
        "Model": model,
        "Attribute": attr_name,
        "Callback": callback,
    }
    if (model, attr_name, callback) in callbacks:
        logging.warning(f"Callback already exists for {(model, attr_name, callback)}")
        callback_log_dict.update({
            "Event": "Duplicate",
            "Execution Time": ""
        })
        callback_log_manager.push(callback_log_dict)
        return

    callbacks.add((model, attr_name, callback))

    callback_log_dict.update({
        "Event": "Set",
        "Execution Time": ""
    })
    callback_log_manager.push(callback_log_dict)

    def _callback(attr, old, new):
        # try:
            # logging.debug(f"Changing {model}.{attr} from {old}:{id(old)} to {new}:{id(new)}")
            result, exec_time = timeit(callback)(attr, old, new)
            logging.info(f"Callback on {model}.{attr_name} took %2.2f sec" % exec_time)
            callback_log_dict.update({
                "Event": "Execute",
                "Execution Time": exec_time
            })
            callback_log_manager.push(callback_log_dict)

        # except Exception as e:
        #     logging.exception(f"Failed callback: {model}, {attr}, {old}, {new}, {e}")

    logging.debug(f"Setting callback for {attr_name} on {model}")
    model.on_change(attr_name, _callback)
