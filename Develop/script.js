$(document).ready(function(){

    $('#currentDay').text( moment().format('MMMM Do YYYY, h:mm:ss a') )

    $('.saveData').on('click',function(){
        var inputText = $(this).siblings('.inputArea').val()
        var inputTime = $(this).parent().attr('id')
        console.log(inputText)
        console.log(inputTime)
        localStorage.setItem(inputTime,inputText)
    })

    $('#9 .inputArea').val(localStorage.getItem('9'))

})