$(document).ready(function(){
    /**
     * This method will be reused everytime a new event happens in this tab.
     * If there's data to be showed, it will fill the form values,
     * otherwise it will clean it. 
     * It will mainly clean if the user searches for a user that does not 
     * exists
     * @param {*} data
     * Author: Dr. Amilcar Soares, unless otherwise stated
     * Adjustments by: Brandon Cuza
     */
    function fillFindContainer(data){
        if (data){
            $("#find-_id").val(data._id);
            $("#find-iso_code").val(data.iso_code);
            $("#find-continent").val(data.continent);
            $("#find-location").val(data.location);
            $("#find-date").val(data.date);
            $("#find-total_cases").val(data.total_cases);
            $("#find-new_cases").val(data.new_cases);
            $("#find-total_deaths").val(data.total_deaths);
            $("#find-new_deaths").val(data.new_deaths);                                
        }else{
            $("#find-_id").val("");
            $("#find-iso_code").val("");
            $("#find-continent").val("");
            $("#find-location").val("");
            $("#find-date").val("");
            $("#find-total_cases").val("");
            $("#find-new_cases").val("");
            $("#find-total_deaths").val("");
            $("#find-new_deaths").val("");
        }      
    }
    /**
     * This is an aux function to assemble the object entry.
     * It will be used mainly to the update function
     */
    function assembleEntry(){
        let string = "ObjectId(";
        let e = {};
        e._id = string.concat($("#find-_id").val(), ")");
        e.iso_code = $("#find-iso_code").val();
        e.continent = $("#find-continent").val();
        e.location = $("#find-location").val();
        e.date = $("#find-date").val();
        e.total_cases = Number($("#find-total_cases").val());
        e.new_cases = Number($("#find-new_cases").val());
        e.total_deaths = Number($("#find-total_deaths").val());
        e.new_deaths = Number($("#find-new_deaths").val());
        //console.log(e);
        return e;
    }
    /**
     * This function binds an event to the find entry button.
     */
    $("#btn-find-entry").click(function(event){
        event.preventDefault();
        let entry_date = $("#find-date-search").val();
        $.ajax({
            url: '/canada/'+entry_date,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                fillFindContainer(response);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * This function will bind an event to the update button.
     */
    $("#btn-update-entry").click(function(event){
        event.preventDefault();
        let entry_date = $("#find-date-search").val();
        let entry = assembleEntry();
        $.ajax({
            url: '/canada/'+entry_date,
            type: 'PUT',
            data: JSON.stringify(entry),
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);                
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * This function will bind an event to the delete button
     */
    $("#btn-delete-entry").click(function(event){
        event.preventDefault();
        let entry_date = $("#find-date-search").val();
        $.ajax({
            url: '/canada/'+entry_date,
            type: 'DELETE',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                // We clear the fields after the data is deleted
                fillFindContainer(null);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    /**
     * This function binds an event to the range button.
     * It gets the total deaths of a start and end date and determines and
     * displays the difference.
     * Author: Brandon Cuza
     * Attribution: Dr. Amilcar Soares, started as copy of $("#btn-find-entry").click(function(event) {})
     */
    $("#btn-find-range").click( async function(event){
        event.preventDefault();
        let entry_date_start = $("#find-date-start-search").val();
        let entry_date_end = $("#find-date-end-search").val();
        var total_deaths_start;
        var total_deaths_end;
        await $.ajax({
            url: '/canada/'+entry_date_start,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                total_deaths_start = response.total_deaths;
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
        await $.ajax({
            url: '/canada/'+entry_date_end,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                total_deaths_end = response.total_deaths             
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
        let total_deaths_difference = total_deaths_end - total_deaths_start;
        $("#numberDead").html(total_deaths_difference);
    });
});