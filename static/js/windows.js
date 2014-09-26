var windows = {
    init: function () {
        $(".footer .ico-restore:eq(1)").click(function () {
            windows.restoreBottom();
            if ($(".footer .ico-restore:eq(0)").css("display") === "none") {
                $(".toolbars .ico-restore").removeClass("ico-restore").addClass("ico-max")
                        .attr({
                            "title": config.label.max_editor,
                            "onclick": "windows.maxEditor()"
                        });
            }
        });

        $(".bottom-window-group .ico-min").click(function () {
            windows.minBottom();
            if ($(".footer .ico-restore:eq(0)").css("display") === "inline") {
                $(".toolbars .ico-max").removeClass("ico-max").addClass("ico-restore")
                        .attr({
                            "title": config.label.restore_editor,
                            "onclick": "windows.restoreEditor()"
                        });
            }
        });

        $(".bottom-window-group .tabs").dblclick(function () {
            windows.maxBottom();
        });

        $(".footer .ico-restore:eq(0)").click(function () {
            windows.restoreSide();
            if ($(".footer .ico-restore:eq(1)").css("display") === "none") {
                $(".toolbars .ico-restore").removeClass("ico-restore").addClass("ico-max")
                        .attr({
                            "title": config.label.max_editor,
                            "onclick": "windows.maxEditor()"
                        });
            }
        });

        $(".side .ico-min").click(function () {
            windows.minSide();
            if ($(".footer .ico-restore:eq(1)").css("display") === "inline") {
                $(".toolbars .ico-max").removeClass("ico-max").addClass("ico-restore")
                        .attr({
                            "title": config.label.restore_editor,
                            "onclick": "windows.restoreEditor()"
                        });
            }
        });

        $(".side .tabs").dblclick(function () {
            windows.maxSide();
        });

        $(window).click(function (event) {
            if ($(event.target).closest(".footer").length === 1
                    || $(event.target).closest(".bottom-window-group").length === 1) {
                return false;
            }
            windows.clearSideBottom();
        });
    },
    maxBottom: function () {
        var $it = $(".bottom-window-group");

        if ($it.hasClass("bottom-window-group-max")) {
            windows.restoreBottom();
            if ($(".side").css("left") !== "0px") {
               $it.css({
                   "left": "0px",
                   "width": "100%"
               });
            }
        } else {
            $it.attr("style", "");

            var bottomH = $(".content").height();
            $(".bottom-window-group .output, notification").height(bottomH - 23);
            $(".bottom-window-group .notification, .bottom-window-group .search").height(bottomH - 19);

            $it.addClass("bottom-window-group-max");
        }
    },
    maxSide: function () {
        var $it = $(".side");
        if ($it.hasClass("side-max")) {
            windows.restoreSide();
        } else {
            $it.addClass("side-max");
        }
    },
    restoreBottom: function () {
        $(".bottom-window-group").removeClass("bottom-window-group-max");
        var bottomH = $(".bottom-window-group").height();

        $(".bottom-window-group .output, notification").height(bottomH - 24);
        $(".bottom-window-group .notification, .bottom-window-group .search").height(bottomH - 20);

        $(".bottom-window-group").animate({
            "top": "70%"
        }, function () {
            $(".edit-panel").css("height", "70%");

            var editorDatas = editors.data;
            for (var i = 0, ii = editorDatas.length; i < ii; i++) {
                editorDatas[i].editor.setSize("100%", $(".edit-panel").height() - $(".edit-panel .tabs").height());
            }

            $(".footer .ico-restore:eq(1)").hide();
        });
    },
    restoreSide: function () {
        $(".side").animate({
            "left": "0"
        }, function () {
            $(".edit-panel, .bottom-window-group").css({
                "left": "20%",
                "width": "80%"
            });

            $(".footer .ico-restore:eq(0)").hide();
        }).removeClass("side-max");
    },
    minBottom: function () {
        $(".edit-panel").css("height", "100%");

        var editorDatas = editors.data;
        for (var i = 0, ii = editorDatas.length; i < ii; i++) {
            editorDatas[i].editor.setSize("100%", $(".content").height() - $(".edit-panel .tabs").height());
        }

        $(".bottom-window-group").css("top", "100%");
        $(".footer .ico-restore:eq(1)").show();
    },
    minSide: function () {
        $(".side").css("left", "-20%").removeClass("side-max");

        $(".edit-panel, .bottom-window-group").css({
            "left": "0",
            "width": "100%"
        });
        $(".footer .ico-restore:eq(0)").show();
    },
    maxEditor: function () {
        $(".toolbars .ico-max").removeClass("ico-max").addClass("ico-restore")
                .attr({
                    "title": config.label.restore_editor,
                    "onclick": "windows.restoreEditor()"
                });

        windows.minBottom();
        windows.minSide();
        wide.curEditor.focus();
    },
    restoreEditor: function () {
        $(".toolbars .ico-restore").removeClass("ico-restore").addClass("ico-max")
                .attr({
                    "title": config.label.max_editor,
                    "onclick": "windows.maxEditor()"
                });

        windows.restoreBottom();
        windows.restoreSide();
        wide.curEditor.focus();
    },
    clearSideBottom: function () {
        if (!this.isEditorMax()) {
            return false;
        }
        $(".side").css("left", "-20%");
        $(".bottom-window-group").css("top", "100%");
    },
    flowBottom: function () {
        if (this.isEditorMax()) {
            $(".bottom-window-group").animate({"top": "70%"});
            $(".side").css("left", "-20%");
        }
    },
    isEditorMax: function () {
        if ($(".toolbars .ico-restore").length === 1
                && $(".footer .ico-restore:eq(0)").css("display") === "inline"
                && $(".footer .ico-restore:eq(1)").css("display") === "inline") {
            return true;
        }

        return false;
    }
};