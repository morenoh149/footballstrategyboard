function width(){
  return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
}
function height(){
  return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
}
draw_field = function() {
  w = width();
  h = height();
SCALE = h/100;
FIELD_X = SCALE * 110;
FIELD_Y = SCALE * 80;
CENTER_RADIUS = SCALE * 9.15;
GOAL_OUTER_X = SCALE * 16.5;
GOAL_OUTER_Y = SCALE * 40.3;
GOAL_INNER_X = SCALE * 5.5;
GOAL_INNER_Y = SCALE * 11;
GOAL_X = SCALE * 1.5;
GOAL_Y = SCALE * 7.5;
MARGIN = SCALE * 2;
FOOTER_ORIG = (FIELD_Y + (MARGIN * 2));


var paper = Raphael((w-FIELD_X)/2, 0,
                    FIELD_X + (MARGIN * 2),
                                        FIELD_Y + (MARGIN * 2) + 100);

// Creates the field
var field = paper.rect(1, 1,
                       FIELD_X + (MARGIN * 2) - 2,
                                              FIELD_Y + (MARGIN * 2) - 2);
field.attr("fill", "green");

var goal_east = paper.rect(MARGIN - GOAL_X,
                           (FIELD_Y / 2) - (GOAL_Y / 2),
                                                      GOAL_X,
                                                                                 GOAL_Y);
var goal_west = paper.rect(FIELD_X + MARGIN,
                           (FIELD_Y / 2) - (GOAL_Y / 2),
                                                      GOAL_X,
                                                                                 GOAL_Y);
var goal_inner_west = paper.rect(MARGIN,
                                (FIELD_Y / 2) - (GOAL_INNER_Y / 2),
                                                                GOAL_INNER_X,
                                                                                                GOAL_INNER_Y);
var goal_outer_west = paper.rect(MARGIN,
                                (FIELD_Y / 2) - (GOAL_OUTER_Y / 2),
                                                                GOAL_OUTER_X,
                                                                                                GOAL_OUTER_Y);
var goal_inner_east = paper.rect(FIELD_X - GOAL_INNER_X + MARGIN,
                                (FIELD_Y / 2) - (GOAL_INNER_Y / 2),
                                                                GOAL_INNER_X,
                                                                                                GOAL_INNER_Y);
var goal_outer_east = paper.rect(FIELD_X - GOAL_OUTER_X + MARGIN, 
                                (FIELD_Y / 2) - (GOAL_OUTER_Y / 2),
                                                                GOAL_OUTER_X,
                                                                                                GOAL_OUTER_Y);
var center_circle = paper.circle(FIELD_X / 2,
                                 FIELD_Y / 2,
                                                                  CENTER_RADIUS);
var half_way_line = paper.path("M" + FIELD_X / 2 + " " + MARGIN +
    "V" + (FIELD_Y + MARGIN));
var north_line = paper.path("M" + MARGIN + " " + MARGIN +
    "H" + (FIELD_X + MARGIN));
var south_line = paper.path("M" + MARGIN + " " +
                            (FIELD_Y + MARGIN) +
                                                        "H" + (FIELD_X + MARGIN));
var west_line = paper.path("M" + MARGIN + " " + MARGIN +
    "V" + (FIELD_Y + MARGIN));
var east_line = paper.path("M" + (FIELD_X + MARGIN) + " " +
                           MARGIN +"V" + (FIELD_Y + MARGIN));
var white_lines = paper.set(goal_east,goal_west,goal_inner_east,
                           goal_inner_west, goal_outer_east,
                                                      goal_outer_west, center_circle,
                                                                                 north_line, south_line, west_line,
                                                                                                            east_line, half_way_line);
white_lines.attr({stroke: "white"});

var start = function () {
      this.ox = this.attr("cx");
          this.oy = this.attr("cy");
              this.animate({r: MARGIN/1, opacity: .5}, 500, ">");
},
move = function (dx, dy) {
      this.attr({cx: this.ox + dx, cy: this.oy + dy});
},
up = function () {
      this.animate({r: MARGIN/1.5, opacity: 1}, 500, ">");
}; 

var circle_a01 = paper.circle(MARGIN, FOOTER_ORIG + MARGIN, MARGIN / 1.5);
var circle_a02 = paper.circle(MARGIN * 3, FOOTER_ORIG + MARGIN, MARGIN / 1.5);
var circle_a03 = paper.circle(MARGIN * 5, FOOTER_ORIG + MARGIN, MARGIN / 1.5);
var circle_a04 = paper.circle(MARGIN * 7, FOOTER_ORIG + MARGIN, MARGIN / 1.5);
var circle_a05 = paper.circle(MARGIN * 9, FOOTER_ORIG + MARGIN, MARGIN / 1.5);
var circle_a06 = paper.circle(MARGIN, FOOTER_ORIG + (MARGIN*3), MARGIN / 1.5);
var circle_a07 = paper.circle(MARGIN * 3, FOOTER_ORIG + (MARGIN * 3), MARGIN / 1.5);
var circle_a08 = paper.circle(MARGIN * 5, FOOTER_ORIG + (MARGIN * 3), MARGIN / 1.5);
var circle_a09 = paper.circle(MARGIN * 7, FOOTER_ORIG + (MARGIN * 3), MARGIN / 1.5);
var circle_a10 = paper.circle(MARGIN * 9, FOOTER_ORIG + (MARGIN * 3), MARGIN / 1.5);
var circle_a11 = paper.circle(MARGIN * 11, FOOTER_ORIG + (MARGIN * 3), MARGIN / 1.5);
var circle_b1 = paper.circle(MARGIN * 15, FOOTER_ORIG + MARGIN, MARGIN/1.5);
red_circles = paper.set(circle_a01, circle_a02, circle_a03, circle_a04, circle_a05, circle_a06, circle_a07, circle_a08, circle_a09, circle_a10, circle_a11);
blu_circles = paper.set(circle_b1);
red_circles.attr("fill", "red");
blu_circles.attr("fill", "blue");
circle = paper.set(red_circles, blu_circles);
circle.drag(move, start, up);
};
window.onload = draw_field;
$(window).resize(function(){
       draw_field();
});
