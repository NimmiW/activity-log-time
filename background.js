var timestamp = new Date().getTime;

var number_of_opened_tabs = 0;

var tabList = [];


/*chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
    alert(response);
});*/

chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.create({url:chrome.extension.getURL('hello.html')});
});

chrome.tabs.onCreated.addListener(function (tab){
    number_of_opened_tabs = number_of_opened_tabs + 1;
    //console.log('total opened tabs: ' + number_of_opened_tabs);
    var t = {
        id : tab.id,
        activetime : 0,
        isActive : false,
        lastActivatedtime : Number(new Date().getTime())
    };
    tabList.push(t);
    console.log('a new Tab created : ' + tab.id);
})

chrome.tabs.onRemoved.addListener(function (id){
    number_of_opened_tabs = number_of_opened_tabs - 1;
    //console.log('total opened tabs: ' + number_of_opened_tabs);
    for (var index in tabList){
        if(tabList[index].id == id){
            tabList.splice( index, 1 );
        }
    }
    console.log('a Tab was closed : ' + id);
})

chrome.tabs.onActivated.addListener(function (tab){
    //console.log('Tab activated : ')
    //console.log(tab);
    for (var index in tabList){
        if(tabList[index].isActive == true){
            tabList[index].isActive = false;
            tabList[index].lastActivatedtime = Number(new Date().getTime());
            console.log('a tab went inactive : ' + tabList[index].id);
        }
        
    }
    for (var index in tabList){
        if(tabList[index].id == tab.tabId){
            var currTimestamp = Number(new Date().getTime())
            var difference = currTimestamp - tabList[index].lastActivatedtime;
            tabList[index].activetime = tabList[index].activetime + difference;
            tabList[index].isActive = true;
            console.log('a tab came active : ' + tabList[index].id);
            console.log('tab ' + tabList[index].id +' had been in that page for '+ tabList[index].activetime + 'ms');
        }
        
    }
    
})

/*chrome.storage.sync.set({'nic': 'lovely girl'}, function() {
    // Notify that we saved.
    console.log('data saved');

    chrome.storage.sync.get('nic', function(val) {
        // Notify that we saved.
        console.log('data retrieved' + val);
        console.log(val);
    });
});*/