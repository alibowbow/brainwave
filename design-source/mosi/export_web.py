import bpy,os,json
p=os.path.dirname(os.path.abspath(__file__));bpy.ops.wm.open_mainfile(filepath=os.environ['MOSI_BLEND'])
out=os.path.abspath(os.path.join(p,'../../public/immersive-worlds/mosi'));os.makedirs(out,exist_ok=True)
bpy.ops.object.select_all(action='DESELECT')
count=0
for o in list(bpy.context.scene.objects):
 if o.type in {'MESH','CURVE'} and not o.hide_render and not o.hide_get():o.select_set(True);count+=1
 elif o.type=='CAMERA' and o.name.startswith('Camera_'):o.select_set(True)
print('EXPORT_VISIBLE_OBJECTS',count,flush=True)
bpy.ops.export_scene.gltf(filepath=os.path.join(out,'mosi-room.glb'),export_format='GLB',use_selection=True,export_apply=True,export_materials='NONE',export_cameras=True,export_lights=False,export_animations=False,export_yup=True)
print([(o.name,o.type) for o in bpy.context.selected_objects if o.type=='MESH'][:20],flush=True)
