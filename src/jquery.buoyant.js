/*
* Plugin by Codonist.com
* */

(function ($) {
    $.fn.buoyant = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            containerClass: "buoyant-container",
            parentClass: 'buoyant-parent',
            elementClass: '',
            imgSrc: '',
            width: 50,
            height: -1,
            backgroundColor: "black",
            fps: 60,
            numberOfItems: 4,
            minRadius: 10,
            maxRadius: 40,
            minSpeed: 20,
            maxSpeed: 70,
            collisionEfficiency: 1,
            gravity: 0,
            trails: false,
            colliding: false
        }, options);


        var ths = this;
        var width = ths.width();
        var height = ths.parent().innerHeight();
        var balls = [];
        var pairs = [];
        var frame = 0;
        var elements = [];

        ths.parent().addClass(settings.parentClass);
        this.each(function () {
            $(this).addClass('buoyant-container');
            $(this).addClass(settings.containerClass);
        });

        var Ball = function (x, y, r, vx, vy) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.m = Math.PI * r * r;
            this.w = r * 2;
            this.h = r * 2;
            this.vx = vx;
            this.vy = vy;
            var ele;
            if (settings.imgSrc) {
                ele = document.createElement("img");
            } else {
                ele = document.createElement("span");
            }
            if (settings.imgSrc) {
                ele.src = settings.imgSrc;
            }
            if (settings.elementClass) {
                ele.classList.add(settings.elementClass);
            }

            ele.style.height = this.h + 'px';
            ele.style.width = this.w + 'px';
            ele.style.marginLeft = '-' + this.r + 'px';
            ele.style.marginTop = '-' + this.r + 'px';
            ele.style.left = this.x + 'px';
            ele.style.top = this.y + 'px';
            elements.push(ele);
            ths.append(ele);

            this.step = function (frame) {
                this.x += (this.vx / settings.fps) * frame;
                this.y += (this.vy / settings.fps) * frame
            };

            this.getMomentum = function () {
                console.log(1);
                return 1
            };

            this.halt = function () {
                this.vx = 0;
                this.vy = 0
            };

            this.update = update(this);
            balls.push(this);
        };

        function update(ball) {
            ball.x += ball.vx / settings.fps;
            ball.y += ball.vy / settings.fps;

            ball.vy += settings.gravity;

            if (ball.x + ball.vx / settings.fps + ball.r > width) {
                ball.vx = Math.abs(ball.vx) * -1;
                ball.vx = ball.vx * settings.collisionEfficiency
            } else if (ball.x + ball.vx / settings.fps - ball.r < 0) {
                ball.vx = Math.abs(ball.vx);
                ball.vx = ball.vx * settings.collisionEfficiency
            }
            if (ball.y + ball.vy / settings.fps + ball.r > height) {
                ball.vy = Math.abs(ball.vy) * -1;
                ball.vy = ball.vy * settings.collisionEfficiency
            } else if (ball.y + ball.vy / settings.fps - ball.r < 0) {
                ball.vy = Math.abs(ball.vy);
                ball.vy = ball.vy * settings.collisionEfficiency
            }
        }

        function distance(ball1, ball2) {
            return Math.sqrt((ball1.x - ball2.x) * (ball1.x - ball2.x) + (ball1.y - ball2.y) * (ball1.y - ball2.y))
        }

        function isColliding(a, b) {
            if (Math.abs(a.x - b.x) <= a.r + b.r && Math.abs(a.y - b.y) <= a.r + b.r) {
                if (distance(a, b) <= a.r + b.r) {
                    return true
                }
            }
        }

        for (var i = 0; i < settings.numberOfItems; i++) {
            new Ball(Math.random() * width, Math.random() * height, settings.minRadius + Math.random() * (settings.maxRadius - settings.minRadius), (settings.minSpeed + Math.random() * (settings.maxSpeed - settings.minSpeed)) * [1, -1][Math.floor(Math.random() + .5)], (settings.minSpeed + Math.random() * (settings.maxSpeed - settings.minSpeed)) * [1, -1][Math.floor(Math.random() + .5)])
        }

        //create a list of pairs
        for (i = 0; i < balls.length - 1; i++) {
            for (var j = i + 1; j < balls.length; j++) {
                pairs.push([balls[i], balls[j]])
            }
        }

        //check all the pairs to see if any balls are colliding
        for (i in pairs) {
            var a = pairs[i][0];
            var b = pairs[i][1];

            if (isColliding(a,b)){
                //do something
            }
        }

        window.onresize = function () {
            width = ths.width();
            height = ths.parent().innerHeight();
        };


        function main_loop() {
            if (settings.trails === false) {
//            ctx.clearRect(0, 0, rectArea.width, rectArea.height)
            }

            if(settings.colliding){
                for (i in pairs) {
                    var a = pairs[i][0];
                    var b = pairs[i][1];

                    if (isColliding(a, b)) {

                        var theta = Math.atan((b.y - a.y) / (b.x - a.x));
                        var error = (a.r + b.r) / (distance(a, b));
                        var ex = Math.cos(theta) * error;
                        var ey = Math.sin(theta);

                        //rotate colisions to make math easier
                        var ravx = Math.cos(theta) * (a.vx) + Math.sin(theta) * (a.vy);
                        var ravy = Math.cos(theta) * (a.vy) - Math.sin(theta) * (a.vx);
                        var rbvx = Math.cos(theta) * (b.vx) + Math.sin(theta) * (b.vy);
                        var rbvy = Math.cos(theta) * (b.vy) - Math.sin(theta) * (b.vx);

                        //maybe this is right? although it still gives same result
                        var ravx2 = ((a.m - b.m) * ravx + 2 * b.m * rbvx) / (a.m + b.m);
                        var ravy2 = ravy;
                        var rbvx2 = (2 * a.m * ravx - (a.m - b.m) * rbvx) / (a.m + b.m);
                        var rbvy2 = rbvy;

                        //rotates back and sets velocities
                        a.vx = Math.cos(theta) * ravx2 - Math.sin(theta) * ravy2;
                        a.vy = Math.cos(theta) * ravy2 + Math.sin(theta) * ravx2;
                        b.vx = Math.cos(theta) * rbvx2 - Math.sin(theta) * rbvy2;
                        b.vy = Math.cos(theta) * rbvy2 + Math.sin(theta) * rbvx2;

                        a.vx = a.vx * settings.collisionEfficiency;
                        a.vy = a.vy * settings.collisionEfficiency;
                    }
                }
            }


            //draw balls
            for (i in balls) {
                elements[i].style.left = balls[i].x + 'px';
                elements[i].style.top = balls[i].y + 'px';
                update(balls[i]);
            }
        }

        setInterval(main_loop, 1000 / settings.fps);

        return this.each(function () {
            $(this).css('height', height + 'px');
            setTimeout(function () {
                width = ths.width();
                height = ths.parent().innerHeight();
            }, 100);
        });
    };

}(jQuery));