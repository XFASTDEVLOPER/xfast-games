// نمایش پیام خوش‌آمدگویی در کنسول
console.log("Welcome to XFAST Games!");

// افکت ظاهر شدن دکمه
window.addEventListener("load", () => {
    const btn = document.querySelector("button");
    if (btn) {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(20px)";

        setTimeout(() => {
            btn.style.transition = "0.6s";
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";
        }, 300);
    }
});
