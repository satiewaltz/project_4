// Made by ruben@leunix.nl
(function () {
    AFRAME.registerComponent("no-sleep", {
        schema: {
            playButtonElem: {
                type: 'string',
                default: "body"
            },
            showOnlyOnMobile: {
                type: 'boolean',
                default: true
            },
            videoSrc: {
                type: 'string'
            }
        },

        video: null,

        update: function () {
            if(this.el.tagName !== "A-SCENE") {
                console.warn("no-sleep needs to be placed on the a-scene element.");
            };

            if(this.data.showOnlyOnMobile && this.el.isMobile === false) {
                return;
            };

            if(this.video) {
                this.video.parentElement.removeChild(this.video);
            }

            this.video = document.createElement("video");
            this.video.setAttribute("src", this.data.videoSrc);
            this.video.setAttribute("type", "video/mp4");
            this.video.setAttribute("controls", "");
            this.video.setAttribute("loop", "true");
            this.video.setAttribute("webkit-playsinline", "");

            this.showButton(this.data.playButtonElem);

            this.video.onplay = this.onPlay.bind(this);
            this.video.onpause = this.onPause.bind(this);
        },

        onPlay: function () {
            this.el.removeAttribute("style");
            this.video.setAttribute("style", "position: absolute; left: -1000px");

            var event = new Event("playButtonPressed");
            this.el.dispatchEvent(event);

/*            setTimeout(function () {
                this.video.pause();
            }.bind(this), 1000);*/
        },

        onPause: function () {
            this.showButton(this.data.playButtonElem);

            var event = new Event("playButtonPaused");
            this.el.dispatchEvent(event);
        },

        showButton: function(buttonElem) {
            var element = document.querySelector(buttonElem);
            element.appendChild(this.video);

            this.video.removeAttribute("style");

            this.el.setAttribute("style", "display: none");

            var event = new Event("playButtonDisplayed");
            this.el.dispatchEvent(event);
        }
    });
})();
