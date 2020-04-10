export function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const textLength = text.split(' ').length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    const result = `~${readingTime} min read`;
    return result;
}

export function updateEvents(events){
    var uevents = events;
    var events_updated = []; 
    uevents.forEach(event => {
        var eventDate = new Date(event.date+'T'+event.time);
        var currentDate = new Date();
        var thisWeekDate = new Date();
        thisWeekDate.setDate(thisWeekDate.getDate()+7);
        var isThisWeek = (currentDate<=eventDate)&&(eventDate<=thisWeekDate);
        var isUpcoming = currentDate<=eventDate;
        event.isThisWeek = isThisWeek;
        event.isUpcoming = isUpcoming;
        return events_updated.push(event);
    })
    return events_updated;
}