var engine = {
    scene: '',
    camera: '',
    renderer: '',
    keyEvents: {},
    controls: '',
    settings: {
        'HORIZONTAL_LIMIT': 82,
        'VERTICAL_LIMIT':40,
        'MOVE_SIZE': 1,
        'CAMERA_DISTANCE':50
    },
    centralObject: '',
    keys: {
        LEFT_KEY: 37,
        UP_KEY:38,
        RIGHT_KEY: 39,
        DOWN_KEY: 40
    },
    /**
     *
     */
    init: function() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.addGround();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    },
    setCentralObject: function(id) {
        this.centralObject = id;
    },
    addGround: function() {
        var grassTex = THREE.ImageUtils.loadTexture('images/grass.png');
        grassTex.wrapS = THREE.RepeatWrapping;
        grassTex.wrapT = THREE.RepeatWrapping;
        grassTex.repeat.x = 256;
        grassTex.repeat.y = 256;
        var groundMat = new THREE.MeshBasicMaterial({map:grassTex});
        var groundGeo = new THREE.PlaneGeometry(400,400);
        var ground = new THREE.Mesh(groundGeo,groundMat);
        ground.position.y = -1.9; //lower it
        ground.rotation.x = -Math.PI/2; //-90 degrees around the xaxis
//IMPORTANT, draw on both sides
        ground.doubleSided = true;
        this.addObject(ground);
    },
    render: function() {
        requestAnimationFrame( this.render.bind(engine) );
        this.renderer.render(this.scene, this.camera);
    },
    addAxis: function() {
        var obj = new THREE.AxisHelper(10);
        return this.addObject(obj);
    },
    addBox: function(hexColor) {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: hexColor } );
        var obj = new THREE.Mesh( geometry, material );
        return this.addObject(obj);
    },
    addPerson: function() {
        var geometry = new THREE.BoxGeometry(1,1,1);
        var obj = new THREE.SkinnedMesh(geometry);
        return this.addObject(obj);
    },
    addObject: function(obj) {
        this.scene.add( obj );
        this.camera.position.z = this.settings.CAMERA_DISTANCE;
        return this.getLatestObject();
    },
    getObject: function(id) {
        return this.scene.children[id];
    },
    getObjectId: function(obj) {
      for (var i = 0; i < this.scene.children.length; i++) {
          if (obj == this.scene.children[i]) {
              return i;
          }
      }
    },
    getLatestObject: function() {
      return this.scene.children[this.scene.children.length-1];
    },
    addKeyEvent: function(keyCode, bindCallback) {
        this.keyEvents[keyCode] = bindCallback;
    },
    initializeKeyEvents: function() {
        var keyEvents = this.keyEvents;
        document.onkeydown = function(e) {
            e = e || window.event;
            var keyCode = e.which;
            var callbackFunction = keyEvents[keyCode];
            callbackFunction();
        }
    }
};