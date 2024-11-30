<script>
import { mapAttrs } from '@/store';
import { npcAttrs } from '@/store';
import { playerAttrs } from '@/store';
import { gameMap } from '@/store';

export default {
  data() {
    return {
      mapAttrs,
      npcAttrs,
      playerAttrs,
      gameMap
    }
  }
}
</script>

<template>
  
<span>
  <pre>
player = new Sprite({{ playerAttrs.coordinate.value }},{{ playerAttrs.size.value }});
player.image = "{{ playerAttrs.emoji.value }}";
player.accer = 0.8;
player.maxSpeed = 5;
player.bounciness = 0;
player.layer = 2;
player.rotationLock = true;
player.attributes = []; 

</pre>
</span>

<span>
  <pre v-for="npcAttr in npcAttrs" class="flex gap-[1rem]">
{{ npcAttr.object.value }} = createInteractiveObject({
d:{{ npcAttr.size.value }},
image:'{{ npcAttr.emoji.value }}',
tile:'{{ npcAttr.sign.value }}',
label:'{{ npcAttr.label.value }}',
systemPrompt:`{{ npcAttr.prompt.value }}`,
firstMessage: `{{ npcAttr.firstMessage.value }}`,
onSend:function(){
    this.update = function(){
        this.rotation += 5
    }
},
onRespond:function(){
    this.update = function(){
        this.rotation = 0
    }
}
});
  </pre>
</span>

<span>
    <pre v-for="attr in mapAttrs">
  {{ attr.object.value }} = createObject({
  d: {{ attr.size.value }},
  image: '{{ attr.emoji.value }}',
  tile: '{{ attr.sign.value }}'
  })
  </pre>
  <pre>
  tilesGroup = new Tiles(
  [
  <pre :key="mapLine.trim" v-for="mapLine in gameMap">
    '{{ mapLine }}',</pre>
  ],
  0,
  0,
  120,
  120
  );
</pre>
  </span>

</template>