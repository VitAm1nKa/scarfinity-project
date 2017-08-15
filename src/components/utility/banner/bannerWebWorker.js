var intervalIndex = 0;

function BannerBackground() {
    console.log("Background prepare");
    let timeout = setTimeout(() => {
        console.log("Do background");
        BannerBackgroundWork();
    }, 1000);
}

function BannerBackgroundWork() {
    intervalIndex = (intervalIndex + 1) % 20;
    console.log("Background =>", intervalIndex);

    // message to prepare
    if((intervalIndex + 1) % 5 === 0) {
        postMessage({
            event: "prepare",
            data: intervalIndex,
        });
    }

    // message change
    if(intervalIndex % 5 === 0) {
        postMessage({
            event: "change",
            data: intervalIndex / 5,
        });
    }

    setTimeout("BannerBackgroundWork", 500);
}

BannerBackground();