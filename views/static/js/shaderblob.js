if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
		var scene = new THREE.Scene();
		var canvas = document.getElementById("canvas");
		var camera = new THREE.PerspectiveCamera( 75, canvas.offsetWidth/590, 1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		var light = new THREE.PointLight( 0xffffff, 1, 50 );

		light.position.set(25, 25, 25);
		renderer.setSize(canvas.offsetWidth, 590);
		renderer.setClearColor(0xefefef, 1.0);


		canvas.appendChild(renderer.domElement);

		var onWindowResize = function() {
		    camera.aspect = canvas.offsetWidth / 590;
		    camera.updateProjectionMatrix();
		    renderer.setSize( canvas.offsetWidth, 590 );
		};

		window.addEventListener('resize', onWindowResize, false);

		var attributes = {
			displacement: {
				type: 'f',
				value: []
			},
			sineoffsets: {
				type: 'f',
				value: []
			},
			amplitudes:{
				type: 'f',
				value: []
			}
		};

		var uniforms = {
			time : {
				type: 'f',
				value: 0
			}
		};

		var geo = new THREE.IcosahedronGeometry( 20, 2 );
		var mat = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			attributes: attributes,
			vertexShader: document.getElementById('vertexshader').textContent,
			fragmentShader: document.getElementById('fragmentshader').textContent,
			wireframe: false,
		} );
		var sphere = new THREE.Mesh(geo, mat);
		var vertices = sphere.geometry.vertices;
		var values = attributes.displacement.value;
		for(var v = 0; v < vertices.length; v++){
			values.push(Math.random()*10);
		}
		var offsets = attributes.sineoffsets.value;
		for(var o = 0; o < vertices.length; o++){
			offsets.push(Math.random()*10);
		}


		scene.add(sphere);
		//scene.add(light);
		camera.position.z = 50;

		function render(){
			uniforms.time.value += 0.01;
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		}
		render();
