<template>
  <span>
    <pre>
      ///////////////////////////////  需要改的地方 End /////////////////////////////////////////
   
   //update sprite label
   for (let i = 0; i &lt; interactiveObjects.length; i++) {
       interactiveObjects[i].labelSprite = new labelSprites.Sprite(interactiveObjects[i].x, interactiveObjects[i].y +0.618*interactiveObjects[i].d/2 , labelSize*interactiveObjects[i].label.length, labelSize,&#x27;none&#x27;);
       interactiveObjects[i].labelSprite.text = interactiveObjects[i].label;
     }
 
 
  observeChangeOfInventory.notify();


}





function draw() {
  clear();
  background(&quot;#ECFEF9&quot;);
  cursor(ARROW);

  camera.on();

  camera.x = player.x;
  camera.y = player.y;
  player.rotation = 0;

  // keyboard events
  if (kb.pressing(&quot;&#x60;&quot;)) camera.zoomTo(0.2);
  else camera.zoomTo(0.7);
  if (kb.presses(&quot;enter&quot;) &amp;&amp; chatInput.value().trim !== &quot;&quot;) sendUserMessage();
    

  
  
  
  // UPDATING INTERACTIVE OBJECTS
  for (let i = 0; i &lt; interactiveObjects.length; i++) {

    if (dist(player.x,player.y,interactiveObjects[i].x,interactiveObjects[i].y) -player.d / 2 &lt;interactiveObjects[i].d / 2 + 50) {
      if (interactiveObjects[i].labelSprite.autoDraw === false &amp;&amp; interactiveObjects[i].onApproach!==undefined) {interactiveObjects[i].onApproach(); }
      interactiveObjects[i].labelSprite.autoDraw = true;
      if (interactiveObjects[i].mouse.hovering()) cursor(HAND);
    } else {
      if (interactiveObjects[i].labelSprite.autoDraw &amp;&amp; interactiveObjects[i].onLeave!==undefined) interactiveObjects[i].onLeave();
      interactiveObjects[i].labelSprite.autoDraw = false;
      
    }
 
    if (interactiveObjects[i].labelSprite.autoDraw) {
      if (interactiveObjects[i].mouse.presses()) {
        setCurrentInteractiveObject(interactiveObjects[i]);
        if (interactiveObjects[i].onInteract!==undefined) interactiveObjects[i].onInteract();
      }
    }
    
    
  }
  
  if (currentInteractiveObject) {
    // now interacting
    if (dist(player.x,player.y,currentInteractiveObject.x,currentInteractiveObject.y) -player.d / 2 &gt;=currentInteractiveObject.d / 2 + 50) 
    {
      setCurrentInteractiveObject(null);
    }
  }
  
  // console.time(&quot;updateUI&quot;);
  // console.timeLog(&quot;updateUI&quot;);
  
  // updating ui
  let chatLog = document.getElementById(&quot;chatLog&quot;);
  let inputDiv= document.getElementById(&quot;inputDiv&quot;);
  if (showChatLog) {
    chatLog.style.display = &quot;block&quot;;
    inputDiv.style.display = &quot;block&quot;;
  } else {
    chatLog.style.display = &quot;none&quot;;
    inputDiv.style.display = &quot;none&quot;;
  }
  // console.timeEnd(&quot;updateUI&quot;);

  // updating player
  if (player.collides(objects) || player.collides(interactiveObjects)) {
    player.drag =30;
    setTimeout(() =&gt; {
      player.drag =0;
      }, 200);  
  }

  // bubble update
  for (let i = 0; i &lt; bubbleQueue.length;) {
    bubbleQueue[i].timeOut--; // 减少 timeOut
    if (bubbleQueue[i].timeOut &lt; 0) {
      // timeOut 小于零，显示泡泡并从队列中删除记录
      bubbleText(bubbleQueue[i].sprite, bubbleQueue[i].text);
      bubbleQueue.splice(i, 1); // 删除当前记录，i 不变，继续循环
    } else {
      i++; // 继续检查下一个记录
    }
  }


  // console.time(&quot;updateiButtons&quot;);
  // console.timeLog(&quot;updateiButtons&quot;);
  camera.off();


  // draw attributes 
  push()
  textSize(15); // 设置文本大小
  textAlign(LEFT, TOP); // 设置文本对齐方式
  noStroke(); // 移除边框
  fill(0); // 设置文本颜色为黑色
  drawAttributes();
  pop();
  

}

// 鼠标点击时调用的函数
function mousePressed() {
  if (mouseX &lt; width) player.moveTo(mouse.x, mouse.y, player.maxSpeed);
}

///////////////////////////////////  UI update /////////////////////////////////

function drawAttributes() {
  let x = 10; // X坐标起始位置
  const spacing = 30; // 属性值之间的间隔

  // 遍历属性数组并显示
  for (let i = 0; i &lt; player.attributes.length; i++) {
    let attribute = player.attributes[i];
    let { name, symbol, quantity } = attribute;

    // 根据数量决定显示的文本
    let displayValue = quantity &gt; 4 ? &#x60;${symbol}X ${quantity}&#x60; : symbol.repeat(quantity);
    if (quantity ===0) displayValue = &#x27;0&#x27;;

    // 计算当前属性文本的宽度
    let textWidthValue = textWidth(&#x60;${name}: ${displayValue}&#x60;);

    // 如果不是第一个属性，添加间隔
    if (i &gt; 0) {
      x += spacing;
    }
    // 显示属性名和格式化后的值
    text(&#x60;${name}: ${displayValue}&#x60;, x, 10);
    // 更新X坐标为下一个属性的位置
    x += textWidthValue;
  }
}

function modifyAttribute(attributeName, changeAmount) {
  // 遍历属性数组，找到对应的属性
  for (let attribute of player.attributes) {
    if (attribute.name === attributeName) {
      // 计算新的属性值，确保它不会小于0
      attribute.quantity = Math.max(attribute.quantity + changeAmount, 0);
      break; // 找到属性后退出循环
    }
  }
}

function updateChatLog() {
  // clear all messages

  chatLog.html(&quot;&quot;);

  // push all current interactive objec t messages

  if (currentInteractiveObject) {
    if (currentInteractiveObject.agent) {
      for (let i = 0; i &lt; currentInteractiveObject.agent.messages.length; i++) {
        let sender = currentInteractiveObject.agent.messages[i].role;
        let message = currentInteractiveObject.agent.messages[i].content;
        let bubbleClass = sender === &quot;user&quot; ? &quot;bubble me&quot; : &quot;bubble you&quot;;
        let chatLabel =
          sender === &quot;user&quot; ? &quot;你&quot; : currentInteractiveObject.label;
        let messageElement = &#x60;&lt;div class=&quot;${bubbleClass}&quot;&gt;${message}&lt;div class=&quot;time&quot;&gt;${chatLabel}&lt;/div&gt;&lt;/div&gt;&#x60;;
        chatLog.html(chatLog.html() + messageElement);
        // 自动滚动到底部
        chatLog.elt.scrollTop = chatLog.elt.scrollHeight;
      }
    }
  }
}


function updateInventory()
{
  inventory.html(&quot;&quot;);
  inventoryItems.forEach((item, index) =&gt; {
    const itemDiv = createDiv();
    itemDiv.class(&#x27;item&#x27;);
    itemDiv.attribute(&#x27;namepluscode&#x27;, item.name+item.code);


    // 添加图像
    const imageSpan = createSpan(item.image);
    imageSpan.class(&#x27;image&#x27;);
    itemDiv.child(imageSpan);

    // 添加名称
    const nameSpan = createP(item.name);
    nameSpan.class(&#x27;name&#x27;);
    itemDiv.child(nameSpan);

    // 添加描述，初始时不显示
    const descriptionSpan = createP(item.description);
    descriptionSpan.class(&#x27;description&#x27;);

    itemDiv.child(descriptionSpan);

    // 鼠标悬停事件，显示和隐藏描述
    itemDiv.mouseOver(function() {
      descriptionSpan.style(&#x27;display&#x27;, &#x27;block&#x27;);
    });
    itemDiv.mouseOut(function() {
      descriptionSpan.style(&#x27;display&#x27;, &#x27;none&#x27;);
    });

    // 将itemDiv添加到容器
    inventory.child(itemDiv);
    if (itemDiv.attribute(&#x27;namepluscode&#x27;) === currentItem_namepluscode) itemDiv.addClass(&#x27;highlight&#x27;);
    itemDiv.elt.addEventListener(&#x27;click&#x27;, function() {
      if (itemDiv.hasClass(&#x27;highlight&#x27;)) {itemDiv.removeClass(&#x27;highlight&#x27;);setCurrentItem(null)}
      else 
      {
        const allItemDivs = document.querySelectorAll(&#x27;.item&#x27;); // 假设所有itemDiv都有&#x27;item&#x27;这个类名
        // 移除所有itemDiv的高亮类
        allItemDivs.forEach(div =&gt; {
          div.classList.remove(&#x27;highlight&#x27;);
        });
        itemDiv.addClass(&#x27;highlight&#x27;);
        setCurrentItem(itemDiv.attribute(&#x27;namepluscode&#x27;));

      }
        
    });
    inventory.elt.scrollTop = inventory.elt.scrollHeight;

  });
}

///////////////////////////////// Object Management /////////////////////////
function createObject(objectParams)
{
  o = new objects.Group();
  o.d = objectParams.d;
  o.image = objectParams.image;
  o.tile = objectParams.tile;
  return o;
}

function createInteractiveObject(objectParams)
{
  io = new interactiveObjects.Sprite(); //注意这里交互物体必须是Sprite才能有agent
  io.d = objectParams.d;
  io.image = objectParams.image;
  io.tile = objectParams.tile ;
  io.label = objectParams.label;
  if (objectParams.systemPrompt!==undefined)
    {
      io.agent = new P5Spark();
      io.agent.setSystemPrompt(objectParams.systemPrompt);
      if (objectParams.firstMessage!==undefined) io.agent.messages.push({ role: &quot;assistant&quot;, content: objectParams.firstMessage });
      if (objectParams.onSend!==undefined) io.onSend = objectParams.onSend;
      if (objectParams.onRespond!==undefined) io.onRespond = objectParams.onRespond;
    }
    if (objectParams.onInteract!==undefined) io.onInteract = objectParams.onInteract;
    if (objectParams.onApproach!==undefined) io.onApproach = objectParams.onApproach;
    if (objectParams.onLeave!==undefined) io.onLeave = objectParams.onLeave;
    
  return io;
}

function deleteInteractiveObject(io)
{
  if (io===currentInteractiveObject) setCurrentInteractiveObject(null);
    io.labelSprite.remove();
    io.remove();
        
}

function deleteCurrentInteractiveObject()
{
  deleteInteractiveObject(currentInteractiveObject);
}

function setCurrentInteractiveObject(newIO)
{
  lastInterativeOject = currentInteractiveObject;
  currentInteractiveObject = newIO;
  if (lastInterativeOject!==currentInteractiveObject) 
    observeChangeOfCurrentInteractiveObject.notify({last:lastInterativeOject,current:currentInteractiveObject}); // notify all observer change of current interactive object
}

////////////////////////////  Item Management ////////////////////////////////


function addItem(itemOptions)
{
  let itemName,itemCode,itemImage,itemDescription;
  if (itemOptions.name === undefined) return;
  itemName = itemOptions.name;
  if (itemOptions.code === undefined) itemCode = floor(random(-100000,-1));
  else itemCode = itemOptions.code;
  if (itemOptions.image === undefined || itemOptions.description === undefined)
  {
    if (itemOptions.image === undefined) itemImage = &#x27;❓&#x27;;
    else itemImage = itemOptions.image;
    if (itemOptions.description === undefined) itemDescription = &#x27;???&#x27;;
    else itemDescription = itemOptions.description;
    inventoryItems.push({name:itemName,code:itemCode,image:itemImage,description:itemDescription});
    observeChangeOfInventory.notify();
    let itemGenerateAgent = new P5GLM();
    itemGenerateAgent.send(&#x60;请帮我为物体${itemName}生成一个emoji和一小段不超过30字的描述，emoji必须严格为一个字符。请严格使用Json格式，两个key为&quot;emoji&quot;和&quot;description&quot;:&#x60;);
    itemGenerateAgent.onComplete = (text) =&gt; {
      const chineseCommaRegex = /(?&lt;=&quot;:)\s*，|(?&lt;=&quot;,)\s*(?=\s*[{])/g; // 可能误用中文逗号
      text = text.replace(chineseCommaRegex, &#x27;,&#x27;);  
      text = text.match(/{[^{}]*}/); // 提取回答中的json格式
      try{
        jsonData = JSON.parse(text);
      }
      catch(error)
      {
        console.log(&#x27;parse error&#x27;);
        itemGenerateAgent.send(&#x60;请帮我为物体${itemName}生成一个emoji和一小段不超过30字的描述，emoji必须严格为一个字符。请严格使用Json格式，两个key为&quot;emoji&quot;和&quot;description&quot;:&#x60;);
      }
      itemGenerateAgent.onError = ()=&gt;{console.log(&#x27;parse error2&#x27;);itemGenerateAgent.send(&#x60;请帮我为物体${itemName}生成一个emoji和一小段不超过30字的描述，emoji必须严格为一个字符。请严格使用Json格式，两个key为&quot;emoji&quot;和&quot;description&quot;:&#x60;);};
      
      if (itemOptions.image === undefined) itemImage= jsonData[&quot;emoji&quot;];
      else itemImage = itemOptions.emoji;
      if (itemOptions.description === undefined) itemDescription =  jsonData[&quot;description&quot;];
      else itemDescription = itemOptions.description;
      for (let i of inventoryItems)
      {
        if (i.code === itemCode) 
        {
          if (i.image === &#x27;❓&#x27;) i.image = itemImage;
          if (i.description === &#x27;???&#x27;) i.description = itemDescription;
        }
      }
      
      observeChangeOfInventory.notify();
    }

  }
  else {
    itemImage = itemOptions.image;
    itemDescription = itemOptions.description;
    inventoryItems.push({name:itemName,code:itemCode,image:itemImage,description:itemDescription});
    observeChangeOfInventory.notify();

  }

  
}

// ItemUse    
function findItemWithNamepluscode(namepluscode)
{
  for (let ii of inventoryItems)
    {if ((ii.name+ii.code) === namepluscode) return ii;}
  return null;
}

function createItemUseButton(text, callback){
  let newbutton = document.createElement(&#x27;button&#x27;);
  newbutton.textContent = text; // 设置按钮上的文字

  // 为按钮添加点击事件监听器
  newbutton.addEventListener(&#x27;click&#x27;, function() {
    let itemName=findItemWithNamepluscode(currentItem_namepluscode).name;
    let ioName = currentInteractiveObject?&#x27;对&#x27;+currentInteractiveObject.label:&#x27;&#x27;;
    bText = &#x60;你${ioName}${text}了${itemName}&#x60;;
    bubble(bText);
    
  });
  newbutton.addEventListener(&#x27;click&#x27;, function() {
     callback(); // 当按钮被点击时，调用回调函数
  });
  iButtons.appendChild(newbutton);
}


function checkIOCondiction(itemUse)
{
  if (itemUse.toInteractiveObjectOf === &#x27;none&#x27; &amp;&amp; currentInteractiveObject === null) itemUse.IOCondition = true;
  if (itemUse.toInteractiveObjectOf === &#x27;all&#x27; &amp;&amp; currentInteractiveObject !== null) itemUse.IOCondition = true;
  if (currentInteractiveObject) if (itemUse.toInteractiveObjectOf === currentInteractiveObject.label) itemUse.IOCondition = true;
  if (itemUse.toInteractiveObjectLike !== undefined &amp;&amp; currentInteractiveObject) 
    {
      let judgeAgent = new P5GLM();
      let currentIO = currentInteractiveObject.label;
      
      if (isThingPairing(currentIO,itemUse.toInteractiveObjectLike)) itemUse.IOCondition = true; // 已经存在于判断表里，不会继续判断
      else{
        judgeAgent.send(&#x60;请判断${currentIO}是否是${itemUse.toInteractiveObjectLike}，请仅用true/false回答，不要解释&#x60;);  
        judgeAgent.onComplete= (t)=&gt;{
        console.log(&#x60;判断${currentIO}是否是${itemUse.toInteractiveObjectLike}结果是${t}&#x60;);
        if (t.includes(&#x27;true&#x27;)) {itemUse.IOCondition = true; addThingPairing(currentIO,itemUse.toInteractiveObjectLike);}
        if (itemUse.itemCondition=== true &amp;&amp; itemUse.IOCondition === true &amp;&amp; currentIO === currentInteractiveObject.label) {itemUseNow.push(itemUse);mergeActionandCreateButtions();}
        }
      }
      
    }
  if (itemUse.itemCondition=== true &amp;&amp; itemUse.IOCondition === true) itemUseNow.push(itemUse);

}

function checkItemCondition(itemUse)
{
  if (currentItem_namepluscode === null) return;
  if (itemUse.withItemOf ===&quot;all&quot;) itemUse.itemCondition=true;
  if (itemUse.withItemOf !== undefined &amp;&amp; currentItem_namepluscode) if (currentItem_namepluscode.includes(itemUse.withItemOf)) itemUse.itemCondition=true;
  if (itemUse.withItemLike!== undefined  &amp;&amp; currentItem_namepluscode) 
    {
      let currentItem = findItemWithNamepluscode(currentItem_namepluscode) ;
      let judgeAgent = new P5GLM();
      let currentItemName= currentItem.name;
      let currentItemNameCode= currentItem.name + currentItem.code;
      if (isThingPairing(currentItem.name,itemUse.withItemLike)) itemUse.itemCondition = true; // 已经存在于判断表里，不会继续判断
      else 
      {
        judgeAgent.send(&#x60;请判断${currentItem.name}是否是${itemUse.withItemLike}，请仅用true/false回答，不要解释&#x60;);
        judgeAgent.onComplete= (t)=&gt;
          {
            console.log(&#x60;判断${currentItemName}是否是${itemUse.withItemLike}结果是${t}&#x60;);
            if (t.includes(&#x27;true&#x27;)) {itemUse.itemCondition = true; addThingPairing(currentItemName,itemUse.withItemLike);}
            if (itemUse.itemCondition=== true &amp;&amp; itemUse.IOCondition === true &amp;&amp; currentItemNameCode === currentItem_namepluscode) {itemUseNow.push(itemUse);mergeActionandCreateButtions();}
          };

      }
      
    }
  if (itemUse.itemCondition=== true &amp;&amp; itemUse.IOCondition === true) itemUseNow.push(itemUse);
}

// 函数：添加配对到记录表
function addThingPairing(thing1, thing2) {
  // 使用thing1和thing2的组合作为键，保持原始顺序
  var key = [thing1, thing2].join(&#x27;:&#x27;);
  // 将键值对添加到记录表中
  thingsLikeRecord[key] = true;
}

// 函数：检查配对是否存在于记录表
function isThingPairing(thing1, thing2) {
  // 使用thing1和thing2的组合作为键，保持原始顺序
  var key = [thing1, thing2].join(&#x27;:&#x27;);
  // 检查键是否存在于记录表中
  return thingsLikeRecord.hasOwnProperty(key);
}

function mergeActionandCreateButtions()
{
  var uniqueItemUseNow = [...new Map(itemUseNow.map(item =&gt; [JSON.stringify(item), item])).values()];
  // 这个数据结构的一个数组 itemUseNow 存了很多这个数据。现在我需要找到所有 do值有重复的数据，
  // 并且将他们的willCause合并成一个回调函数，作为合并后的元素的willCause。
  // 所有 itemUseNow 中的数据都要通过这个操作，合并相同的do值
  var willCauseMap = {};
  // 遍历itemUseNow数组，填充willCauseMap
  uniqueItemUseNow.forEach(item =&gt; {
    // 如果这个do值还没有记录，初始化一个空数组
    if (!willCauseMap[item.do]) {
      willCauseMap[item.do] = [];
    }
    // 将当前项的willCause添加到对应do值的数组中
    willCauseMap[item.do].push(item.willCause);
  });

  // 创建一个新的数组，包含合并后的do和willCause
  var mergedActions = Object.keys(willCauseMap).map(doKey =&gt; {
    // 对于每个do值，创建一个合并后的willCause回调函数
    const mergedWillCause = function() {
      willCauseMap[doKey].forEach(callback =&gt; callback());
    };
    
    
    // 返回包含do值和合并后的willCause的元素
    return {
      do: doKey,
      willCause: mergedWillCause
    };
  });

  iButtons.innerHTML = &#x27;&#x27;;
  mergedActions.forEach(action =&gt; {
    createItemUseButton(action.do, action.willCause);
  });


}

function updateIButtons()
{
  
  itemUseNow = [];
  for (let itemUse of itemUseDictionary) 
    {
      itemUse.IOCondition = false; 
      itemUse.itemCondition = false;
      checkIOCondiction(itemUse);
      checkItemCondition(itemUse);
    
    }

    mergeActionandCreateButtions();
}


function deleteItem(itemNameOrCode)
{
  // 从后向前遍历，避免索引问题
  for (var i = inventoryItems.length - 1; i &gt;= 0; i--) {
    iNamepluscode = inventoryItems[i].name + inventoryItems[i].code;
    if (iNamepluscode.includes(itemNameOrCode)) {
      if (iNamepluscode === currentItem_namepluscode) setCurrentItem(null);
      inventoryItems.splice(i, 1);
      observeChangeOfInventory.notify();
    }
  }
  
}

function deleteCurrentItem()
{
  deleteItem(currentItem_namepluscode);
}

function setCurrentItem(namepluscode)
{
  lastItem_namepluscode = currentItem_namepluscode;
  currentItem_namepluscode = namepluscode;
  if (lastItem_namepluscode!==currentItem_namepluscode) 
    observeChangeOfCurrentItem.notify({last:lastItem_namepluscode,current:currentItem_namepluscode});
}


//////////////////////////////////// bubble //////////////////////////////////////////////////
function bubbleFromSprite(sprite, text) {
  let maxTimeOut = 0;
  let spriteBubbling = false;
  // 检查队列中是否已经有相同 sprite 的记录
  for (let i = 0; i &lt; bubbleQueue.length; i++) {
    if (bubbleQueue[i].sprite === sprite) {
      maxTimeOut = Math.max(maxTimeOut, bubbleQueue[i].timeOut);
      spriteBubbling = true;
    }
  }
  if (spriteBubbling)maxTimeOut+=25
  // 添加新泡泡记录到队列
  bubbleQueue.push({
    sprite: sprite,
    text: text,
    timeOut: maxTimeOut  // 设置 timeOut
  });
}

function bubble(text){bubbleFromSprite(player,text)}

function bubbleText(sprite,text)
{
  if (sprite === undefined || sprite ===  null) return
  bubbleSprite = new Sprite(sprite.x+random(-80,80), sprite.y - 60, labelSize*text.length, labelSize,&#x27;none&#x27;);
  bubbleSprite.textSize = labelSize*0.7;
  bubbleSprite.color = &quot;#F9EEEC&quot;;
  bubbleSprite.strokeWeight = 0;
  bubbleSprite.text = text;
  bubbleSprite.vel.y = -1;
  bubbleSprite.life = 100;

}

////////////////////////////  Scene Management ////////////////////////////////

function switchScene(scene)
{

  let functionName = &#x27;scene&#x27; + currentScene + &#x27;Exit&#x27;;
  if (typeof window[functionName] === &#x27;function&#x27;) {window[functionName](); console.log(&#x27;exiting&#x27;+currentScene )}; 
  sceneExit(); 
  functionName = &#x27;scene&#x27; + scene + &#x27;Enter&#x27;;
  currentScene = scene;
  if (typeof window[functionName] === &#x27;function&#x27;) {window[functionName](); console.log(&#x27;enter&#x27;+scene )}; 
}



function sceneExit()
{
    objects.tile = &#x27;.&#x27;;
    objects.removeAll();
    if(player)player.remove();
    interactiveObjects.removeAll();
    labelSprites.removeAll();
}


//////////////////////////// Observer /////////////////////////////////////

function createObservable() {
  // 存储观察者列表
  const observers = [];

  // 注册观察者
  const subscribe = (observer) =&gt; {
    if (typeof observer === &#x27;function&#x27;) {
      observers.push(observer);
    } else {
      throw new Error(&#x27;Observer must be a function&#x27;);
    }
  };

  // 移除观察者
  const unsubscribe = (observer) =&gt; {
    observers.splice(observers.indexOf(observer), 1);
  };

  // 通知所有观察者
  const notify = (data) =&gt; {
    observers.forEach(observer =&gt; observer(data));
  };

  // 返回一个对象，包含订阅和通知的方法
  return {
    subscribe,
    unsubscribe,
    notify
  };
}

const observeChangeOfCurrentItem = createObservable();
const observeChangeOfCurrentInteractiveObject =  createObservable();
const observeChangeOfInventory =  createObservable();
const chatLogObserver = (interactiveObject)=&gt;{
  if (interactiveObject.current === null) showChatLog = false;
  else showChatLog = true;
  updateChatLog();
};
observeChangeOfCurrentItem.subscribe(updateIButtons);
observeChangeOfCurrentInteractiveObject.subscribe(chatLogObserver);
observeChangeOfCurrentInteractiveObject.subscribe(updateIButtons);
observeChangeOfInventory.subscribe(updateInventory);


</pre>
  </span>
</template>