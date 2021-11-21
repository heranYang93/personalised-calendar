const workingHrStart = 9
const workingHrEnd = 18
const workingHrsArray = Array.from( Array(workingHrEnd-workingHrStart+1), (val,id) => (id+workingHrStart) )

const slotsContainer = $('.time-block')

// Let jQuery detect the state of readiness
$(document).ready(function(){

    // render current time onto the jumbotron
    $('#currentDay').text( moment().format('MMMM Do YYYY, h:mm:ss a') )

    for (var singleHrId in workingHrsArray){
        //for each hour, create a wrapper following this structure:
        //
        //<div class='singleTimeSlot row h-25' id='9'>
        //   <div class='singleTimeSlot-time col-md-2'>9:00</div>
        //   <input class='inputArea col-md-8'></input>
        //   <button class='saveData col-md-2'></button>
        //</div>

        // A single hour
        var thisHr = workingHrsArray[singleHrId]

        // Create a wrapper division
        var singleHrWrapperEl = $('<div>');

        // edit this wrapper class and id (use default height for now)
        singleHrWrapperEl.attr('class', 'time-block row');
        singleHrWrapperEl.attr('id', thisHr);

        //create three elements under this wrapper class
        var singleHrDisplayEl = $('<div>');
        var singleHrInputEl = $('<input>');
        var singleHrConfirmEl = $('<button>');

        // append element following the hierarchy
        singleHrWrapperEl.append(singleHrDisplayEl)
        singleHrWrapperEl.append(singleHrInputEl)
        singleHrWrapperEl.append(singleHrConfirmEl)

        slotsContainer.append(singleHrWrapperEl)

        // give these elements their class and other attributes (be aware that the totle column nr = 12)
        // current width proportion = 2:8:2
        // height = 2
        singleHrDisplayEl.attr('class', 'hour p-4 col-md-2');//hour is a preset given by the defaul css
        singleHrInputEl.attr('class', 'inputArea col-md-8');
        singleHrConfirmEl.attr('class', 'saveBtn confirm col-md-2'); // saveBtn is by default

        // single hour display content
        singleHrDisplayEl.text(thisHr+':00');

        //Saving button
        singleHrConfirmEl.text('💾')
        $('.saveBtn').on('click',function(){
            var inputText = $(this).siblings('.inputArea').val()
            var inputTime = $(this).parent().attr('id')
            localStorage.setItem(inputTime,inputText)
        })

        // Input area colour
        var currentHr= moment().toArray()[3]//extract the current hour
        if (thisHr === currentHr){
            //present
            singleHrInputEl.addClass('present')
        }
        else if (thisHr < currentHr){
            //past
            singleHrInputEl.addClass('past')
        }
        else if (thisHr > currentHr) {
            //future
            singleHrInputEl.addClass('future')
        }

        //Render content to each input area
        // compile the name of the item in which we want to render the text
        singleHrInputEl.val(localStorage.getItem(thisHr))
    }
})