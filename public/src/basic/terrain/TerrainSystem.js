import { NoiseGenerator } from "./NoiseGenerator.js"

const noiseGenerator = new NoiseGenerator()
let terrainSystem = {
    'config1': {
        noiseType: 'perlin',
        scale: 100,
        octaves: 1,
        persistence: .22,
        lacunarity: 4.9,//6.9,
        exponentiation: 5.8,
        seed: 1,
        height: 150
    },
    'config2': {
        noiseType: 'perlin',
        scale: 1,
        octaves: 1,
        persistence: 1,
        lacunarity: 1,//6.9,
        exponentiation: 1,
        seed: 1,
        height: 1,
        finalHeight: 1,
        displacementX: 1,
        displacementZ: 1
    },
    filters: null,
    'customNoiseGenerator': (x, y) => {
        let out = noiseGenerator.perlin2d(x, y) + noiseGenerator.perlin2d(
            x + terrainSystem.config2.displacementX,
            y + terrainSystem.config2.displacementZ,
            terrainSystem.config2
        ) * terrainSystem.config2.finalHeight * 0
        if(terrainSystem.filters){
            out = terrainSystem.filters(x, y, out)
        }
        return out
    }
}
noiseGenerator.params = terrainSystem.config1
// window.terrainSystem = terrainSystem

export default terrainSystem