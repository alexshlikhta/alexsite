import EmergeMaterial from '../../helpers/EmergeMaterial';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import useScreenSize from '../../helpers/useScreenSize';
import { View } from '@react-three/drei';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PIXELS = [
  1, 1.5, 2, 2.5, 3, 1, 1.5, 2, 2.5, 3, 3.5, 4, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 3, 3.5, 4, 4.5,
  5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 20, 100, 1, 1.5, 2, 2.5, 3, 1, 1.5, 2, 2.5, 3, 3.5, 4, 2, 2.5,
  3, 3.5, 4, 4.5, 5, 5.5, 6, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 20, 100,
].map((v) => v / 100);

export default function EmergingImage({ ...props }) {
  const [refMesh, setRefMesh] = useState(null);
  const [texture, setTexture] = useState(null);
  const [textureSize, setTextureSize] = useState([0, 0]);
  const [elementSize, setElementSize] = useState([0, 0]);
  const ref = useRef();
  const screenSize = useScreenSize();

  const renderImage = () => {
    let bounds = ref.current.getBoundingClientRect();
    setElementSize([bounds.width, bounds.height]);
    refMesh?.scale.set(bounds.width, bounds.height, 1);
  };

  useEffect(() => {
    new THREE.TextureLoader().loadAsync(props.url).then((data) => {
      setTextureSize([data.source.data.width, data.source.data.height]);
      setTexture(data);
    });
  }, []);

  useGSAP(() => {
    if (refMesh) {
      renderImage();

      gsap.to(refMesh.material, {
        uProgress: 1,
        duration: 2,
        ease: 'none',
      });

      gsap.to('.scene', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'bottom top',
          scrub: true,
          // markers: true,
        },
      });
    }
  }, [ref, refMesh]);

  useEffect(() => {
    renderImage();
  }, [screenSize]);

  return (
    <View ref={ref} {...props}>
      <mesh ref={setRefMesh}>
        <emergeMaterial
          uFillColor={new THREE.Color('#000000')}
          transparent={true}
          uTexture={texture}
          uPixels={PIXELS}
          uTextureSize={new THREE.Vector2(textureSize[0], textureSize[1])}
          uElementSize={new THREE.Vector2(elementSize[0], elementSize[1])}
        />
        <planeGeometry args={[1, 1]} />
      </mesh>
    </View>
  );
}
