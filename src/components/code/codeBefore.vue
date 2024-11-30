<template>
    <span>
        <pre>
// 接收到GPT消息时会调用的函数
let player;
let objects;
let interactiveObjects;
let mainInteractiveObjects;
let bufferPlayer;
let labelSprites;
let currentInteractiveObject = null;
let itemButton;
let sendButton;
let chatInput;
let chatLog;
let inventory;
let iButtons;
let showChatLog = false;
let labelSize = 30;
let mainSceneAgents=[];
let currentScene = 0;
let itemUseDictionary = [];
let itemUseNow = [];
let inventoryItems=[];
let currentItem_namepluscode = null;
let thingsLikeRecord = {};
let lastInterativeOject = null;
let lastItem_namepluscode = null;
let bubbleQueue = [];


function sendUserMessage() {
  if (currentInteractiveObject.onSend!==undefined) currentInteractiveObject.onSend();
  let message = chatInput.value();
  if (message.trim() !== &quot;&quot;) {
    chatInput.value(&quot;&quot;);
    // 系统回复
    if (currentInteractiveObject.agent) {
      currentInteractiveObject.agent.send(message);
      updateChatLog();
      currentInteractiveObject.agent.onComplete = (t) =&gt; {
        if (currentInteractiveObject.onRespond!==undefined)  currentInteractiveObject.onRespond(t);
        updateChatLog();
      };
    
    }
  }
}

function setup() {
  new Canvas(700, 800);
  frameRate(60);
  p5play.renderStats = false;
  
  var chatInterface = document.getElementById(&#x27;chatInterface&#x27;);
  chatInterface.style.left = width + &#x27;px&#x27;;
  chatInterface.style.height = height + &#x27;px&#x27;;

  inventory = select(&quot;#inventory&quot;);
  sendButton = select(&quot;#sendButton&quot;);
  itemButton = select(&#x27;#itemButton&#x27;);
  chatInput = select(&quot;#chatInput&quot;);
  chatLog = select(&quot;#chatLog&quot;);
  iButtons = document.getElementById(&#x27;iButtons&#x27;);

  sendButton.mousePressed(sendUserMessage);

  objects = new Group();
  objects.collider = &quot;s&quot;;
  objects.bounciness = 0;
  objects.layer = 1;

  interactiveObjects = new Group();
  interactiveObjects.collider = &quot;s&quot;;
  interactiveObjects.layer = 1;
  interactiveObjects.textSize = 20;
  interactiveObjects.bounciness = 0;
  interactiveObjects.labelSprite = null;

  labelSprites = new Group();
  labelSprites.textSize = labelSize*0.7;
  labelSprites.color = &quot;#ECFEF9AA&quot;;
  labelSprites.strokeWeight = 0;
  labelSprites.autoDraw = false;

   /////////////////////////       需要改的地方  Start  /////////////////////////////////////
</pre>
    </span>
</template>