<script>
    const formData = {
        email: '',
        answer1: '',
        answer2: '',
        answer3: '',
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    function handleSubmit() {
        fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: encode({"form-name": "survey", ...formData})
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

    }
</script>

<main>
    <h1>DeWocracy form</h1>
    <form name="survey"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          class="form-poll"
          on:submit|preventDefault={handleSubmit}
    >
		<p class="hidden">
			<label>Don’t fill this out if you're human: <input name="bot-field" /></label>
		</p>
		<input type="hidden" name="form-name" value="survey" />
        <div class="form-field">
            <label for="answer1">Question 1?</label>
            <input type="text" name="answer1" id="answer1" bind:value={formData.answer1} required>
        </div>
        <div class="form-field">
            <label for="answer2">Question 2?</label>
            <input type="text" name="answer2" id="answer2" bind:value={formData.answer2} required>
        </div>
        <div class="form-field">
            <label for="answer3">Question 3?</label>
            <input type="text" name="answer3" id="answer3" bind:value={formData.answer3} required>
        </div>
        <div class="form-field">
            <label for="email">Enter your email: </label>
            <input type="email" name="email" id="email" bind:value={formData.email	} required>
        </div>
        <div class="form-field">
            <button type="submit">Send form!</button>
        </div>
    </form>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    form.form-poll {
        display: inline-grid;
    }

    label, input {
        display: table-cell;
        margin-bottom: 10px;
    }

    label {
        padding-right: 10px;
    }
	.hidden {
		display: none;
	}
</style>
