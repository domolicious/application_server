#!/usr/bin/env node

"use strict";

const Environment = require("../lib/environment");

const Babel = require("../tasks/babel");
const Sass = require("../tasks/sass");
const StaticFiles = require("../tasks/static_files");
const MyBrowserify = require("../tasks/my_browserify");

var start_date = new Date();

log_start();
build();
log_done();

function build()
{
	let env = new Environment();
	env.setup();

	let babel = new Babel(env);
	babel.run();

	let sass = new Sass(env);
	sass.run();

	let sf = new StaticFiles(env);
	sf.copy();

	let mb = new MyBrowserify(env);
	mb.createLibs();
}

function log_start()
{
	let ts = start_date.toTimeString().substr(0, 8);

	console.log("[X]", `[${ts}]`, "application_server", "starting");
}

function log_done()
{
	let now = new Date();
	let elapsed_time = now.getTime() - start_date.getTime() + "ms";
	let ts = now.toTimeString().substr(0, 8);
}
