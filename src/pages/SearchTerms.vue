<template>
  <section>
    <h1>Wikipedia Search</h1>
    <h3>Search the terms that you don't understand here</h3>
    <a
      title="User:Psiĥedelisto rendered, User:Slashme created the Blender model and The Titou made the rendering&#039;s background transparent., CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
      ><img
        class="wiki-img"
        width="256"
        alt="Wikipedia logo puzzle globe spins horizontally and vertically, revealing the contents of all of its puzzle pieces, without background"
        src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces%2C_without_background.gif"
    /></a>
    <a
      href="https://commons.wikimedia.org/wiki/File:Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically,_revealing_the_contents_of_all_of_its_puzzle_pieces,_without_background.gif"
      class="animation-text"
      target="_blank"
      ><i>*Animation via Wikimedia Commons</i></a
    >
    <form @submit.prevent="handleSubmit">
      <span class="p-input-icon-left" style="margin-bottom: 1rem">
        <i class="pi pi-search" />
        <InputText
          class="input-text"
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          style="width: 20rem"
        />
      </span>
      <Button
        v-if="!isLoading"
        style="color: white"
        class="input-button p-button-secondary p-button-outlined"
        type="submit"
        label="Search Word"
      />
      <i v-else class="pi pi-spin pi-spinner" style="fontSize: 3rem"></i>
    </form>

    <Dialog
      v-model:visible="displayError"
      style="display:flex; flex-direction: column; align-items:center; width:auto; background:white"
      position="top"
    >
      <template #header style="background:rgb(29, 33, 37)">
        <h2 style="color:red;">Wikipedia Search Error</h2>
      </template>
      <div class="dialog-content">
        <p>Message: {{ error }}</p>
      </div>
      <template #footer>
        <Button
          class="p-button-secondary"
          label="Okay"
          @click="displayDialog"
          v-scroll-to="'#viewResult'"
        />
      </template>
    </Dialog>

    <button class="goto-button" v-if="tempQuery" v-scroll-to="'#viewResult'">
      <i class="pi pi-angle-double-down" style="fontSize:2rem"></i>
    </button>

    <div id="viewResult">
      <div v-if="emptyResults">
        <h3>No result found &nbsp;:(</h3>
        <h5>
          Your search&nbsp;"<strong>{{ tempQuery }}</strong
          >"&nbsp;did not match any documents.
        </h5>
        <h5 style="text-align:center">
          Please Check the spelling of the words correctly.
        </h5>
      </div>

      <div
        v-else
        class="result-container"
        v-for="result in resultArray"
        :key="result"
      >
        <div class="icon-container">
          <a :href="result.url" class="result-title" target="_blank"
            ><h4>{{ result.title }}</h4></a
          >
          <a :href="result.url" target="_blank"
            ><i class="external-link pi pi-external-link"></i
          ></a>
        </div>

        <a :href="result.url" target="_blank" class="result-url"
          ><h5>
            {{ result.url }}
          </h5></a
        >
        <p class="result-snippet">
          <span v-html="result.snippet"></span>&nbsp;...
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  components: {
    Dialog,
    Button,
    InputText,
  },
  data() {
    return {
      searchQuery: "",
      tempQuery: "",
      error: "",
      displayError: false,
      isLoading: false,
      resultArray: [],
      emptyResults: false,
    };
  },
  methods: {
    displayDialog() {
      this.isLoading = false;
      this.displayError = !this.displayError;
    },
    async searchWikipedia(searchQuery) {
      this.isLoading = true;
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchQuery}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const wikiData = await response.json();
      console.log(wikiData);
      this.isLoading = false;
      return wikiData;
    },

    async handleSubmit() {
      try {
        const result = await this.searchWikipedia(this.searchQuery);
        if (result.error) {
          this.error = result.error.info;
          this.displayDialog();
        } else {
          this.tempQuery = "";
          this.tempQuery = this.searchQuery;
          this.searchQuery = "";
          this.resultArray = [];
          this.emptyResults = false;
          this.displayResults(result);
        }
      } catch (err) {
        console.log("Error: " + err);
      }
    },

    displayResults(results) {
      if (!results.continue) {
        this.emptyResults = true;
      } else {
        results.query.search.forEach((result) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          this.resultArray.push({
            title: result.title,
            snippet: result.snippet,
            url: url,
          });
        });
      }
    },
  },
};
</script>

<style scoped>
section {
  height: inherit auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem 5rem 1rem;
}
section h1 {
  font-size: 2.5rem;
  margin-block-start: 2rem;
  margin-block-end: 0rem;
}
section h3 {
  margin: 1rem 0rem 3rem 0rem;
  text-align: center;
}
.animation-text {
  font-size: 0.7rem;
  margin-bottom: 2rem;
  color: white;
  text-decoration: none;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}
.dialog-content {
  max-width: 20rem;
  line-height: 1rem;
  margin: 0rem;
}
.goto-button {
  background: none;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
}
.goto-button:hover {
  color: #a59f9f;
  border: 1px solid #a59f9f;
  border-radius: 45%;
}
#viewResult {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0rem 0rem 0rem;
}
.result-container {
  height: auto;
  width: 85%;
  border: 2px sold rgb(29, 33, 37);
  box-shadow: 4px 0 10px -3px #010101;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 1rem;
  line-height: 1rem;
  margin: 1rem 0rem;
  background: #23232e;
}
.result-title {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
}
.result-url {
  color: rgb(50, 50, 235);
}
.external-link {
  font-size: 2rem;
  color: white;
}
.icon-container {
  display: flex;
  justify-content: space-between;
}
.icon-container h4 {
  height: auto;
  line-height: 2rem;
}
h4,
h5,
p {
  font-weight: 300;
  margin: 0.3rem;
}
@media only screen and (max-width: 600px) {
  #viewResult {
    padding: 0rem;
    margin: 1rem 0rem 0rem 0rem;
  }
}
@media only screen and (min-height: 1080px) {
  section {
    margin: 3rem 0rem;
  }
  h1 {
    font-size: 5rem !important;
  }
  h3 {
    margin-bottom: 2rem !important;
    font-size: 2rem !important;
  }
  .animation-text {
    margin-top: 1rem;
    font-size: 1rem !important;
  }
  .wiki-img {
    width: 30rem;
  }
  .input-text {
    width: 30rem !important;
    padding: 1rem;
  }
  .input-button {
    width: 15rem;
    font-size: 1.5rem;
    padding: 0.7rem 2rem 0.7rem 2rem !important;
  }
}
</style>
