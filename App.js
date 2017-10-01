import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import Expo from "expo";
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Expo.GLView
        ref={ref => (this._glView = ref)}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }

  _onGLContextCreate = async gl => {
    const arSession = await this._glView.startARSessionAsync();
    const scene = new THREE.Scene();
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = -0.5;
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.07;
      cube.rotation.y += 0.04;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
