"use strict";
function width() {
  return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
}
function height() {
  return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
}

var g_masterPathArray;
var g_masterDrawingBox;
var paper;

function draw_field() {
  var w = width(),
  h = height(),
  SCALE = h/100,
  FIELD_X =       SCALE * 110,
  FIELD_Y =       SCALE * 80,
  CENTER_RADIUS = SCALE * 9.15,
  GOAL_OUTER_X =  SCALE * 16.5,
  GOAL_OUTER_Y =  SCALE * 40.3,
  GOAL_INNER_X =  SCALE * 5.5,
  GOAL_INNER_Y =  SCALE * 11,
  GOAL_X =        SCALE * 1.5,
  GOAL_Y =        SCALE * 7.5,
  MARGIN =        SCALE * 2,
  FOOTER_ORIG = (FIELD_Y + (MARGIN * 2));
  
  var paper = Raphael((w-FIELD_X)/2, 0,
                      FIELD_X + (MARGIN * 2),
                      FIELD_Y + (MARGIN * 2) + 100);
  // Creates the field
  var field = paper.rect(1, 1,
                         FIELD_X + (MARGIN * 2) - 2,
                         FIELD_Y + (MARGIN * 2) - 2);
  field.attr("fill", "green");
  field.mousemove(function (event) {
    var evt = event;
    var IE = document.all?true:false;
    var x,y;
    if (IE) {
      x = evt.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y = evt.elientY + document.body.scrollTop +
        document.doucmentElement.scrollTop;
    } else {
      x = evt.pageX - ((w-FIELD_X)/2);
      y = evt.pageY;
    }
console.log("x: " + x + "y: " + y);
    this.ox = x - 10;
    this.oy = y - 10;
  });
  var draw_start = function() {
    g_masterPathArray = new Array();
  },
  draw_move = function (dx, dy) {
    if (g_masterPathArray.length == 0) {
      g_masterPathArray[0] = ["M", this.ox, this.oy];
      g_masterDrawingBox = paper.path(g_masterPathArray);
      g_masterDrawingBox.attr({stroke: "#000", "stroke-width": 3});
    } else {
      g_masterPathArray[g_masterPathArray.length] = ["L", this.ox, this.oy];
    }
    g_masterDrawingBox.attr({path: g_masterPathArray});
  },
  draw_up = function() {
    ;
  };
  field.drag(draw_move, draw_start, draw_up);

  //declare field lines
  var goal_east = paper.rect(MARGIN - GOAL_X,
                             (FIELD_Y / 2) - (GOAL_Y / 2),
                             GOAL_X,
                             GOAL_Y),
  goal_west = paper.rect(FIELD_X + MARGIN,
                             (FIELD_Y / 2) - (GOAL_Y / 2),
                             GOAL_X,
                             GOAL_Y),
  goal_inner_west = paper.rect(MARGIN,
                                  (FIELD_Y / 2) - (GOAL_INNER_Y / 2),
                             GOAL_INNER_X,
                             GOAL_INNER_Y),
  goal_outer_west = paper.rect(MARGIN,
                                  (FIELD_Y / 2) - (GOAL_OUTER_Y / 2),
                             GOAL_OUTER_X,
                             GOAL_OUTER_Y),
  goal_inner_east = paper.rect(FIELD_X - GOAL_INNER_X + MARGIN,
                                  (FIELD_Y / 2) - (GOAL_INNER_Y / 2),
                             GOAL_INNER_X,
                             GOAL_INNER_Y),
  goal_outer_east = paper.rect(FIELD_X - GOAL_OUTER_X + MARGIN, 
                                  (FIELD_Y / 2) - (GOAL_OUTER_Y / 2),
                             GOAL_OUTER_X,
                             GOAL_OUTER_Y),
  center_circle = paper.circle(FIELD_X / 2,
                                   FIELD_Y / 2,
                             CENTER_RADIUS),
  half_way_line = paper.path("M" + FIELD_X / 2 + " " + MARGIN +
      "V" + (FIELD_Y + MARGIN)),
  north_line = paper.path("M" + MARGIN + " " + MARGIN +
      "H" + (FIELD_X + MARGIN)),
  south_line = paper.path("M" + MARGIN + " " +
                              (FIELD_Y + MARGIN) +
                              "H" + (FIELD_X + MARGIN)),
  west_line = paper.path("M" + MARGIN + " " + MARGIN +
      "V" + (FIELD_Y + MARGIN)),
  east_line = paper.path("M" + (FIELD_X + MARGIN) + " " +
                             MARGIN +"V" + (FIELD_Y + MARGIN)),
  white_lines = paper.set(goal_east,goal_west,goal_inner_east,
    goal_inner_west, goal_outer_east, goal_outer_west, center_circle,
    north_line, south_line, west_line,east_line, half_way_line);
  white_lines.attr({stroke: "white"});
  
  var circle_start = function () {
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.animate({r: MARGIN/1, opacity: .5}, 500, ">");
  },
  circle_move = function (dx, dy) {
        this.attr({cx: this.ox + dx, cy: this.oy + dy});
  },
  circle_up = function () {
        this.animate({r: MARGIN/1.5, opacity: 1}, 500, ">");
  }; 
  //create red circles
  var circle_a01 = paper.circle(MARGIN, FOOTER_ORIG + MARGIN, MARGIN / 1.5);
  var circle_a02 = paper.circle(MARGIN*3, FOOTER_ORIG+MARGIN, MARGIN / 1.5);
  var circle_a03 = paper.circle(MARGIN*5, FOOTER_ORIG+MARGIN, MARGIN / 1.5);
  var circle_a04 = paper.circle(MARGIN*7, FOOTER_ORIG+MARGIN, MARGIN / 1.5);
  var circle_a05 = paper.circle(MARGIN*9, FOOTER_ORIG+MARGIN, MARGIN / 1.5);
  var circle_a06 = paper.circle(MARGIN, FOOTER_ORIG+(MARGIN*3), MARGIN/1.5);
  var circle_a07 = paper.circle(MARGIN*3,FOOTER_ORIG+(MARGIN * 3),
                                MARGIN/1.5);
  var circle_a08 = paper.circle(MARGIN*5, FOOTER_ORIG+(MARGIN * 3),
                                MARGIN/1.5);
  var circle_a09 = paper.circle(MARGIN * 7, FOOTER_ORIG + (MARGIN * 3),
                                MARGIN / 1.5);
  var circle_a10 = paper.circle(MARGIN * 9, FOOTER_ORIG + (MARGIN * 3),
                                MARGIN / 1.5);
  var circle_a11 = paper.circle(MARGIN * 11, FOOTER_ORIG + (MARGIN * 3),
                                MARGIN / 1.5);
  //create blue circles
  var circle_b01 = paper.circle(MARGIN * 15, FOOTER_ORIG + MARGIN,
                                MARGIN/1.5);
  var circle_b02 = paper.circle(MARGIN * 17, FOOTER_ORIG + MARGIN,
                                MARGIN/1.5);
  var circle_b03 = paper.circle(MARGIN * 19, FOOTER_ORIG + MARGIN,
                                  MARGIN/1.5);
  var circle_b04 = paper.circle(MARGIN * 21, FOOTER_ORIG + MARGIN,
                                  MARGIN/1.5);
  var circle_b05 = paper.circle(MARGIN * 23, FOOTER_ORIG + MARGIN,
                                  MARGIN/1.5);
  var circle_b06 = paper.circle(MARGIN * 17, FOOTER_ORIG + MARGIN*3,
                                  MARGIN/1.5);
  var circle_b07 = paper.circle(MARGIN * 19, FOOTER_ORIG + MARGIN*3,
                                  MARGIN/1.5);
  var circle_b08 = paper.circle(MARGIN * 21, FOOTER_ORIG + MARGIN*3,
                                  MARGIN/1.5);
  var circle_b09 = paper.circle(MARGIN * 23, FOOTER_ORIG + MARGIN*3,
                                  MARGIN/1.5);
  var circle_b10 = paper.circle(MARGIN * 25, FOOTER_ORIG + MARGIN*3,
                                  MARGIN/1.5);
  var circle_b11 = paper.circle(MARGIN * 25, FOOTER_ORIG + MARGIN,
                                  MARGIN/1.5);
  
  var red_circles = paper.set(circle_a01, circle_a02, circle_a03, circle_a04,
    circle_a05, circle_a06, circle_a07, circle_a08, circle_a09,
    circle_a10, circle_a11);
  var blu_circles = paper.set(circle_b01, circle_b02, circle_b03, circle_b04,
    circle_b05, circle_b06, circle_b07, circle_b08, circle_b09,
    circle_b10, circle_b11);
  red_circles.attr("fill", "red");
  blu_circles.attr("fill", "blue");
  var circle = paper.set(red_circles, blu_circles);
  circle.drag(circle_move, circle_start, circle_up);
};
$(window).resize(function() {
       draw_field();
});
