// $() jquery wrapper
$(function () {

    var $buttonsContainer = $("#buttons");
    var $gifsContainer = $("#gifs");
    var $search = $("#search");
    var $submit = $("#submit");


    var app = {
        gifs: [],
        apiKey: "b0AyYBYO60R9wyflgUi7I8vC9b0t3giy",
        render: function (gifs) {
            var $wrapperDiv = $("<div>");
            gifs.forEach((gif) => {
                var imageUrl = gif.images.fixed_height.url;
                var $img = $("<img>").attr("src", imageUrl).css("margin", "10px").attr("still", "f");
                $img.click(function(){
                    switch($(this).attr("still")){
                        case "t":
                            return $(this).attr("still", "f").attr("src", gif.images.fixed_height.url);
                        case  "f":
                            return $(this).attr("still", "t").attr("src", gif.images.fixed_height_still.url);
                    }
                })
                $wrapperDiv.append($img);
            })
            $gifsContainer.html($wrapperDiv);
        },
        callApi: function (queryString) {
            var url = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${queryString}`;
            $.ajax({
                url,
                method: "GET"
            }).then((result) => {
                this.render(result.data);
            });
        },
        appendNewBtn: function(value){
            var $newBtn = $("<button>");
                $newBtn.text(value);
                $newBtn.addClass("btn btn-primary button");
                $newBtn.click(function () {
                    var text = $(this).text();
                    app.callApi(text);
                })
                $buttonsContainer.append($newBtn);
                this.gifs.push(value);
                this.callApi(value);
        },
        start: function () {
            for (var i = 0; i < this.gifs.length; i++) {
                var currentElement = this.gifs[i]
                var $newBtn = $("<button>");
                $newBtn.text(currentElement);
                $newBtn.addClass("btn btn-primary button");
                $newBtn.click(function () {
                    var text = $(this).text();
                    app.callApi(text);
                })
                $buttonsContainer.append($newBtn);
            }
            $submit.click(() => {
                var value = $search.val();
                this.appendNewBtn(value);
            })
        }
    }
    app.start();
})



