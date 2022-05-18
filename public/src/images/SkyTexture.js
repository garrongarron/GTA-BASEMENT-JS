
const loader = new THREE.CubeTextureLoader();
const skyTexture = loader.load([
    'src/images/space-posx.jpg',
    'src/images/space-negx.jpg',
    'src/images/space-posy.jpg',
    'src/images/space-negy.jpg',
    'src/images/space-posz.jpg',
    'src/images/space-negz.jpg'
]);


export default skyTexture