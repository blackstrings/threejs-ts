(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dog = (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.bark = function () {
        console.log("name is: " + this.name);
    };
    return Dog;
}());
exports.Dog = Dog;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dog_1 = require("./dog");
//works but turning off for now
var mesh;
var canvas;
var renderer;
var scene;
var height = 300;
var width;
var camera;
var light;
var controls;
window.onload = function () {
    //test
    var d = new dog_1.Dog("tom");
    d.bark();
    //buttom mapping
    var btnF = document.getElementById('btnForward');
    btnF.addEventListener('click', camForward);
    var btnB = document.getElementById('btnBack');
    btnB.addEventListener('click', camBack);
    var btnReset = document.getElementById('btnReset');
    btnReset.addEventListener('mousedown', camReset);
    //get canvas
    canvas = document.getElementById('canvasContainer');
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    //scene
    scene = new THREE.Scene();
    //render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x333F47, 0);
    canvas.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.set(0, 6, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
    //render first frame
    renderer.render(scene, camera);
    //lights
    light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    scene.add(light);
    //mesh
    mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshNormalMaterial());
    scene.add(mesh);
    //orbit control to camera, trick to geting the plugin to work is to import it in the html
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //render loop
    render();
};
window.onresize = function (e) {
    renderer.setSize(canvas.offsetWidth, height);
    camera.aspect = canvas.offsetWidth / height;
    camera.updateProjectionMatrix();
};
function camBack() {
    if (camera) {
        camera.position.z += 1;
    }
}
function camForward() {
    if (camera) {
        camera.position.z -= 1;
    }
}
function camReset() {
    if (camera) {
        camera.position.set(0, 10, 20);
        //camera.fov = 75;
        //camera.lookAt(new THREE.Vector3(0,0,0));
        controls.reset();
    }
}
function render() {
    requestAnimationFrame(render);
    mesh.rotation.y += .01;
    renderer.render(scene, camera);
    controls.update();
}

},{"./dog":1}]},{},[2]);
