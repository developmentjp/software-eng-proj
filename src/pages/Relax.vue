<template>
  <section>
    <h1>Relaxer</h1>
    <div
      class="container"
      id="container"
      :class="{ grow: containerGrow, shrink: containerShrink }"
    >
      <div class="circle"></div>

      <p id="text">{{ textP }}</p>

      <div class="pointer-container">
        <span class="pointer"></span>
      </div>

      <div class="gradient-circle"></div>
    </div>
    <div>
      <p><i>*Based from the relaxer app of Traversy Media</i></p>
    </div>
  </section>
</template>

<script>
const totalTime = 7500;
export default {
  mounted() {
    this.breathAnimation();
    this.setAnimationInterval();
  },
  data() {
    return {
      containerShrink: false,
      containerGrow: false,
      textP: "",
    };
  },
  methods: {
    breathAnimation() {
      const breatheTime = (totalTime / 5) * 2;
      const holdTime = totalTime / 5;

      // this.$refs.text.innerText = "Breathe In!";
      this.textP = "Breathe In!";
      this.containerGrow = true;
      this.containerShrink = false;

      setTimeout(() => {
        this.textP = "Hold";
        // this.$refs.text.innerText = "Hold";

        setTimeout(() => {
          // this.$refs.text.innerText = "Breathe out!";
          this.textP = "Breathe out!";
          this.containerShrink = true;
          this.containerGrow = false;
        }, holdTime);
      }, breatheTime);
    },
    setAnimationInterval() {
      setInterval(this.breathAnimation, totalTime);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
section {
  background: url("https://cutewallpaper.org/21/1920x1080-gif/Full-HD-GIF-Desert-Night-Lights-1920x1080-GIF.gif")
    no-repeat center center/cover;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  min-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 300px;
  width: 300px;
  position: relative;
  transform: scale(1);
}

.circle {
  background-color: #010f1c;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.gradient-circle {
  background: conic-gradient(
    #b3cde0 0%,
    #6497b1 40%,
    #fff 40%,
    #fff 60%,
    #03396c 60%,
    #011f4b 100%
  );
  height: 320px;
  width: 320px;
  z-index: -2;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: -10px;
}

.pointer {
  background-color: #fff;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: block;
}

.pointer-container {
  position: absolute;
  top: -40px;
  left: 140px;
  width: 20px;
  height: 190px;
  animation: rotate 7.5s linear forwards infinite;
  transform-origin: bottom center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.container.grow {
  animation: grow 3s linear forwards;
}

@keyframes grow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
}

.container.shrink {
  animation: shrink 3s linear forwards;
}

@keyframes shrink {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>
