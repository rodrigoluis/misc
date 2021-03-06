import * as THREE from 'three';
import {setMaterial,
        buildLowerTexture,
        cut,
        createWall,
        createCutMesh,
        createFloor,
        createWallComplex,
        createWallTextured,
        createGuardaCorpo} from './util/util.js'

import { door,
         doorVidro,
         doorMain,
         smallWindow50x70} from './util/settings.js'

export function buildC(color, location = null)
{
   let material = setMaterial(null, color.cmat, 10, 3);
   // paredes principais verticais (em y)
   let base = createWallTextured(14.6, 0.2, 3.5,   -0.02, -0.1, 2.9,  material);
   let cut1 = createCutMesh(15, 0.3, 2.3);
   base = cut(base, cut1, 0.6, -0.1, 3.6, false);
   base = cut(base, cut1, 10.6, -0.1, 4.5, false);
   base.material = material;
   location.add(base); // wall 1    
}

export function createSecondFloor(color)
{
   let secondFloor = new THREE.Object3D();

   let floor = createFloor(14.5, 19, 0.20,   0, 0, 3,  color.secondFloorMat,10,10); 
   let piscina = createCutMesh(3, 2, 2);
   floor = cut(floor, piscina, 11.5, 1, 3, true);

   let lowerPlane = buildLowerTexture(secondFloor, 14.5, 6,  0, 0, 2.98,  color.secondFloorTeto, 3, 3)
   //lowerPlane = cut(floor, lowerPlane, 6.5, 6.1, 3);
   secondFloor.add(lowerPlane)

   let stairHole = createCutMesh(3.5, 1.10, 2);
   floor = cut(floor, stairHole, 6.5, 6.1, 3, true);

   secondFloor.add(floor);

   let greenFloor = createFloor(4.5, 13.1, 0.27,   10.01, 6, 2.95,  color.grass,2,6); 

   secondFloor.add(greenFloor);

   let doorVidroH = createCutMesh(doorVidro.l, doorVidro.p, doorVidro.a);
   let doorVidroV = createCutMesh(doorVidro.p, doorVidro.l, doorVidro.a);
   let doorGH = createCutMesh(doorMain.l, doorMain.p, doorMain.a);
   let doorGV = createCutMesh(doorMain.p, doorMain.l, doorMain.a);
   let doorPH = createCutMesh(door.l, door.p, door.a);
   let doorPV = createCutMesh(door.p, door.l, door.a);
   let window1 = createCutMesh(smallWindow50x70.p, smallWindow50x70.l, smallWindow50x70.a)

   // paredes principais verticais (em y)
   let wall
   wall = createWall('V', 19,   -0.01, 0, 3.20,  color.secondFloorWalls);
   //let window1 = createCutMesh(1, 1, 1);
   let window2 = createCutMesh(1, 2, 1);

   /* TODO - FINALIZAR A INCLUS??O DAS OUTRAS JANELAS */
   wall = cut(wall, window1, -0.5, 2.5, 4.5, false, smallWindow50x70, 'V');
   wall = cut(wall, window1, -0.5, 6.75, 4.5, false);
   wall = cut(wall, window1, -0.5, 9, 4.5, false);
   wall = cut(wall, window1, -0.5, 11.25, 4.5, false);
   wall = cut(wall, window1, -0.5, 13.5, 4.5, false);
   wall = cut(wall, window1, -0.5, 17, 4.5, false);   
   secondFloor.add(wall); // wall 1 

   wall = createWall('V', 17.5,  5, 1.50, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorPV, 5, 5.2, 3.20, false, door, 'V', color.door);

   //wall = cut(wall, doorPV, 5, 6.75, 3.20, false);
   wall = cut(wall, doorPV, 5, 9, 3.20, false, door, 'V', color.door);
   wall = cut(wall, doorPV, 5, 11.25, 3.20, false, door, 'V', color.door);
   wall = cut(wall, doorPV, 5, 13.5, 3.20, false, door, 'V', color.door);
   wall = cut(wall, doorPV, 5, 17, 3.20, false, door, 'V', color.door);
   secondFloor.add(wall);  // wall 2

   wall = createWall('V', 8.5,  6.5, 10.5, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorPV, 6.5, 11.25, 3.20, false, door, 'V', color.door);
   wall = cut(wall, doorPV, 6.5, 17, 3.20, false, door, 'V', color.door);
   secondFloor.add(wall);  // wall 3

   wall = createWall('V', 13,  10, 6, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorVidroV, 10, 8, 3.20, false); // porta suite
   wall = cut(wall, window2, 10, 12.5, 4.5, false);
   wall = cut(wall, window2, 10, 16.5, 4.5, false);
   secondFloor.add(wall);  // wall 4

   // paredes principais horizontais (em x)
   wall = createWall('H', 6,  2, 1.50, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorVidroH, 2.5, 1.50, 3.20, false); // porta suite
   wall = cut(wall, doorVidroH, 5.5, 1.50, 3.20, false); // porta sala
   //wall = cut(wall, smallWindow, 3.5, 1.50, 4.70, false); // porta sala
   secondFloor.add(wall); // wall 5

   wall = createWall('V', 5,  2, 1.6, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorPV, 2, 5, 3.20, false, door, 'V', color.door);
   secondFloor.add(wall); // wall 16 -- closet - interior

   // Second floor stone wall ------------------------------------------ 
   let parede = setMaterial(color.secondFloorWalls)    
   wall = createWallComplex('V', 1.5,  2, 0.1, 3.20,  
   setMaterial(null, color.stonewallrot, 2, 2),parede,  // x+, x-
   parede, parede, // y+, y-
   parede, parede) // z+, z-
   secondFloor.add(wall); // wall 17 -- final do closet

   wall = createWallComplex('H', 2,  0.1, 0.09, 3.20,  
   parede, parede, // x+, x-
   parede, setMaterial(null, color.stonewall, 2, 2), // y+, y-
   parede, parede) // z+, z-
   secondFloor.add(wall); // wall 18 -- final do closet (horizontal)   
   // -- End of Second floor stone wall -------------------------------

   wall = createWall('H' ,5,  0, 6.50, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorPH, 2.5, 6.50, 3.2, false, door, 'H', color.door);// porta suite
   secondFloor.add(wall); // wall 6

   wall = createWall('H',5,   0, 8.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 7

   wall = createWall('H',5,   0, 11.0, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 8

   wall = createWall('H',5,   0, 12.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 9

   wall = createWall('H',5,   0, 16.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 10   

   wall = createWall('H',10,  0, 19.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 11

   wall = createWall('H',3.5, 6.5, 16.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 12

   wall = createWall('H',3.5, 6.5, 10.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 13

   // Outras paredes
   wall = createWall('V', 4.6,  8, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 14

   wall = createWall('H', 2,  8, 6.0, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 15


   buildC(color, secondFloor);

   //let guardaCorpo = createGuardaCorpo(0.02, 13.9, 20,  0.2, 3,  7.4, 0.0, 3.7, color.bronze) 
   let guardaCorpo = createGuardaCorpo(0.02, 11.9, 20,  0.2, 3,  8.05, 0.0, 3.7, color.bronze) // movex ?? metade do tamanho total    
   secondFloor.add(guardaCorpo)

   return secondFloor;
}
