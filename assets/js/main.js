$(function(){

    let $lengthSelect = $(".length-selection");
    for (let i = 1; i <= 25; i++){
        $lengthSelect.append($('<option></option>').val(i).html(i))
    }
    $lengthSelect.val(10).change();

    let $originSelect = $(".origin-selection");
    $originSelect.append($('<option></option>').val("any").html("any"));

    Object.keys(db).forEach(function(key) {
        $originSelect.append($('<option></option>').val(key).html(key));
    });

    $("#generate-name-form").submit(function(event) {
        let values = {};
        $.each($("#generate-name-form").serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });

        event.preventDefault();
        let minLength = values["min-length"];
        let maxLength = values["max-length"];

        if(parseInt(minLength) > parseInt(maxLength)) {
            alert("Min length can't be greater than max length");
            return;
        }

        let origin = values["origin"];
        let randomName = "";
        if(origin == 'any') {
            let origins = Object.keys(db);
            let randomOrigin = db[origins[Math.floor(Math.random() * Math.floor(origins.length))]];
            randomName = randomOrigin[Math.floor(Math.random() * Math.floor(randomOrigin.length))];
        } else {
            console.log(db[origin]);
            randomName = db[origin][Math.floor(Math.random() * Math.floor(db[origin].length))];
        }

        if(randomName.length > maxLength) {
            randomName = randomName.slice(0, maxLength);
        }

        if(randomName.length < minLength) {
            randomName += ((Math.random() + 1).toString(10).substring(0, minLength - randomName.length)).replace(".","0");
        }

        $("#random-name").text(randomName);
    })
});