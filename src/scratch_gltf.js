const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '../public/models/iphone17.glb');

try {
  const data = fs.readFileSync(glbPath);
  
  // Read GLB Header
  const magic = data.readUInt32LE(0);
  const version = data.readUInt32LE(4);
  const length = data.readUInt32LE(8);
  
  if (magic !== 0x46546C67) {
    console.error("Not a valid GLB file");
    process.exit(1);
  }
  
  // Read Chunk 0 (JSON)
  const chunkLength = data.readUInt32LE(12);
  const chunkType = data.readUInt32LE(16);
  
  if (chunkType !== 0x4E4F534A) {
    console.error("First chunk is not JSON");
    process.exit(1);
  }
  
  const jsonBuffer = data.slice(20, 20 + chunkLength);
  const jsonContent = JSON.parse(jsonBuffer.toString('utf-8'));
  
  console.log("=== GLB JSON CHUNK PARSED ===");
  console.log("Nodes:", jsonContent.nodes ? jsonContent.nodes.length : 0);
  console.log("Meshes:", jsonContent.meshes ? jsonContent.meshes.length : 0);
  console.log("Materials:", jsonContent.materials ? jsonContent.materials.length : 0);
  
  if (jsonContent.nodes) {
    console.log("\n=== Node Hierarchy ===");
    jsonContent.nodes.forEach((node, idx) => {
      console.log(`Node [${idx}]: name="${node.name || 'Unnamed'}" | mesh=${node.mesh !== undefined ? node.mesh : 'none'} | translation=${node.translation ? JSON.stringify(node.translation) : 'none'} | scale=${node.scale ? JSON.stringify(node.scale) : 'none'}`);
    });
  }
  
  if (jsonContent.meshes) {
    console.log("\n=== Meshes ===");
    jsonContent.meshes.forEach((mesh, idx) => {
      console.log(`Mesh [${idx}]: name="${mesh.name || 'Unnamed'}" | primitives count=${mesh.primitives ? mesh.primitives.length : 0}`);
    });
  }
  
} catch (e) {
  console.error("Error reading GLB:", e);
}
