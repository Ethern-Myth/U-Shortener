document.getElementById("shorten-btn").addEventListener("click", function () {
	var originalUrl = document.getElementById("original-url").value.trim();
	if (originalUrl !== "") {
		// Check if the originalUrl starts with either http:// or https://
		if (
			!originalUrl.startsWith("http://") &&
			!originalUrl.startsWith("https://")
		) {
			// Prepend https:// if it doesn't start with http:// or https://
			originalUrl = "https://" + originalUrl;
		}
		fetch("https://u-shortener.vercel.app/shorten", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				originalUrl: originalUrl,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				var shortenedUrl = data.shortenedUrl;
				document.getElementById(
					"shortened-url"
				).innerHTML = `<strong class="text-gray-800">
                Shortened URL:</strong> <span class="text-indigo-600">${shortenedUrl}</span> 
                <button class="text-gray-500 hover:text-gray-700 items-center justify-center" 
                onclick="copyToClipboard('${shortenedUrl}')">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" 
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3a2 2 0 00-2-2h-4a2 2 0 00-2 2v2">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3v2a2 2 0 002 2h2M9 11h6">
                </path></svg></button>`;
			})
			.catch((error) => {
				console.error("Error:", error);
				document.getElementById("shortened-url").innerHTML =
					"Error shortening URL. Please try again.";
				document.getElementById("shortened-url").classList.add("text-red-600");
			});
	}
});

function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			alert("Copied to clipboard!");
		})
		.catch((err) => {
			console.error("Unable to copy to clipboard:", err);
			alert("Failed to copy to clipboard. Please try again.");
		});
}
