"use strict";const u=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10];function n(r,e=5){return(.5+r*u[e]<<0)/u[e]}function o(r,e){return Math.round(r/e)*e}exports.preciseNumber=n;exports.roundNumberTo=o;
