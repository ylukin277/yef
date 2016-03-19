var advice = [
    {
        'page-header': "Advice"
    },
    {
        'page-header': "Советы"
    }
];

function updateAdviceContent(language,divContent){
    divContent.innerHTML = '';
    if(getParam('all') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-all"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceList.php",
            data: "language=" + language,
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                cont += '<table>';
                for (var i=0; i<advices.length; i++) {
                    cont += '<tr onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' +
                    '<td><img class="list-image" src="http://' + location.hostname + advices[i][3] + '"></td>' +
                    '<td><p class="list-text">' + advices[i][1] + '</p></td>' +
                    '</tr>';
                }
                cont += '</table>';
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('liked') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-liked"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceLikedList.php",
            data: "language=" + language + "&user=" + $.cookie('user'),
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                cont += '<table>';
                for (var i=0; i<advices.length; i++) {
                    cont += '<tr onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' +
                    '<td><img class="list-image" src="http://' + location.hostname + advices[i][3] + '"></td>' +
                    '<td><p class="list-text">' + advices[i][1] + '</p></td>' +
                    '</tr>';
                }
                cont += '</table>';
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('recommended') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceRecommendedList.php",
            data: "language=" + language + "&user=" + $.cookie('user'),
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                cont += '<table>';
                for (var i=0; i<advices.length; i++) {
                    cont += '<tr onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' +
                    '<td><img class="list-image" src="http://' + location.hostname + advices[i][3] + '"></td>' +
                    '<td><p class="list-text">' + advices[i][1] + '</p></td>' +
                    '</tr>';
                }
                cont += '</table>';
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('id') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdvice.php",
            data: "language=" + language + "&id=" + getParam('id'),
            success: function (data) {
                var advice = JSON.parse(data);
                divContent.innerHTML += '<table><tr><td><img class="advice-image" height="100" src="http://'+location.hostname+advice[3]+'"></td>' +
                '<td><a class="advice-title">'+advice[1]+'</a></td></tr></table>'+'<p class="advice-text">'+advice[2]+'</p>';
            }
        });
    }
}