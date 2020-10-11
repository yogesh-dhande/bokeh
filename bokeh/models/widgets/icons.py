# -----------------------------------------------------------------------------
# Copyright (c) 2012 - 2020, Anaconda, Inc., and Bokeh Contributors.
# All rights reserved.
#
# The full license is in the file LICENSE.txt, distributed with this software.
# -----------------------------------------------------------------------------
""" Various kinds of icon widgets.

"""

# -----------------------------------------------------------------------------
# Boilerplate
# -----------------------------------------------------------------------------
import logging

from bokeh.core.properties import Enum
from bokeh.core.properties import Bool
from bokeh.core.properties import Float
from bokeh.core.properties import String

log = logging.getLogger(__name__)

# -----------------------------------------------------------------------------
# Imports
# -----------------------------------------------------------------------------

# Bokeh imports
from ...core.has_props import abstract
from ...model import Model

# -----------------------------------------------------------------------------
# Globals and constants
# -----------------------------------------------------------------------------

__all__ = ("AbstractIcon", "FontAwesomeIcon")

# -----------------------------------------------------------------------------
# General API
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# Dev API
# -----------------------------------------------------------------------------


@abstract
class AbstractIcon(Model):
    """ An abstract base class for icon widgets.

    """


class FontAwesomeIcon(AbstractIcon):
    """ A "stock" icon based on FontAwesome. """

    icon_name = String(
        "check",
        help="""
    What icon to use. See http://fortawesome.github.io/Font-Awesome/icons/
    for the list of available icons.
    """,
    )

    size = Float(
        1,
        help="""
    The size multiplier (1x, 2x, ..., 5x).
    """,
    )

    flip = Enum(
        "horizontal",
        "vertical",
        default=None,
        help="""
    Optionally flip the icon horizontally or vertically.
    """,
    )

    spin = Bool(
        False,
        help="""
    Indicates a spinning (animated) icon. This value is ignored for
    icons that do not support spinning.
    """,
    )


# -----------------------------------------------------------------------------
# Private API
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# Code
# -----------------------------------------------------------------------------
