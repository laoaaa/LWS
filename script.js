// script.js
const tickSound = document.getElementById("tick-sound");
const dripSound = document.getElementById("drip-sound");

// 设置敲击声音的音量为 50%
tickSound.volume = 0.5;

let lastElapsed = 0;
const cycleDuration = 30000; // 动画的总时长为30秒

function checkBambooPosition(timestamp) {
    const elapsed = (timestamp % cycleDuration) / cycleDuration;

    // 在填水阶段（前96%）间隔播放滴水声
    if (elapsed < 0.96 && Math.floor(elapsed * 10) % 5 === 0 && lastElapsed !== Math.floor(elapsed * 10)) {
        dripSound.play();
    }

    // 在回弹阶段（97% - 100%）播放敲击声
    if (elapsed >= 0.97 && lastElapsed < 0.97) {
        tickSound.play();
    }

    lastElapsed = elapsed;
    requestAnimationFrame(checkBambooPosition); // 继续监控动画
}

// 点击页面后启动装置
window.addEventListener("click", () => {
    requestAnimationFrame(checkBambooPosition); // 开始监控动画位置
});
