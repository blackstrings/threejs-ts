import {Dog} from './dog';

//works but turning off for now
let mesh:THREE.Mesh;
let canvas:HTMLElement;
let renderer:THREE.WebGLRenderer;
let scene:THREE.Scene;
let height:number = 300;
let width:number;
let camera:THREE.PerspectiveCamera;
let light:THREE.PointLight;
let controls:THREE.OrbitControls;

window.onload = function(){
	//test
	let d = new Dog("tom");
	d.bark();

	//buttom mapping
	let btnF = document.getElementById('btnForward');
	btnF.addEventListener('click', camForward);

	let btnB = document.getElementById('btnBack');
	btnB.addEventListener('click', camBack);

	let btnReset = document.getElementById('btnReset');
	btnReset.addEventListener('mousedown', camReset);

	//get canvas
	canvas = document.getElementById('canvasContainer');
	width = canvas.offsetWidth;
	height = canvas.offsetHeight;

	//scene
	scene = new THREE.Scene();

	//render
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(width, height);
	renderer.setClearColor(0x333F47, 0);
	canvas.appendChild(renderer.domElement);

	//camera
	camera = new THREE.PerspectiveCamera(75,width/height,1,1000);
	camera.position.set(0,6,0);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);

	//render first frame
	renderer.render(scene, camera);

	//lights
	light = new THREE.PointLight(0xffffff);
  light.position.set(-100,200,100);
  scene.add(light);

	//mesh
	mesh = new THREE.Mesh(new THREE.BoxGeometry(5,5,5), new THREE.MeshNormalMaterial());
	scene.add(mesh);

	//orbit control to camera, trick to geting the plugin to work is to import it in the html
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	//render loop
	render();

}

window.onresize = function(e){
		renderer.setSize(canvas.offsetWidth, height);
		camera.aspect = canvas.offsetWidth / height;
		camera.updateProjectionMatrix();
	}

function camBack():void{
	if(camera){ camera.position.z += 1;}
}
function camForward():void{
	if(camera){ camera.position.z -= 1;}
}

function camReset():void{
	if(camera){
		camera.position.set(0,10,20);
		//camera.fov = 75;
		//camera.lookAt(new THREE.Vector3(0,0,0));

		//pretty much all you need
		controls.reset();
	}
}



function render(){
		requestAnimationFrame(render);
		mesh.rotation.y += .01;
		renderer.render(scene, camera);
		controls.update();
}
