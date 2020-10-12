$(function(){
    let $select = $(".length-selection");
    for ( i = 1; i <= 25; i++){
        $select.append($('<option></option>').val(i).html(i))
    }
    $select.val(10).change();

    $("#generate-name-form").submit(function(event) {
        let values = {};
        $.each($("#generate-name-form").serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();
        $.get({
            url: "http://names.drycodes.com/1",
            headers:
            {
                "Accept": "application/json",
            }
        })
        .done(function (data) {
            let minLength = values["min-length"];
            let maxLength = values["max-length"];
            let randomName = data[0];

            if(randomName.length > maxLength) {
                randomName = randomName.slice(0, maxLength);
            }

            if(randomName.length < minLength) {
                randomName += ((Math.random() + 1).toString(10).substring(0, minLength - randomName.length)).replace(".","0");
            }

            $("#random-name").text(randomName);
        })
        .fail(function () {
            alert("error");
        })
    });
});