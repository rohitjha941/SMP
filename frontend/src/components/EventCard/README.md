<EventCard
className = 'custom class'
eventData={
{
imgSrc = 'imported image'
imgAlt = 'alternative text for image'
heading = 'heading for event'
text = 'text for event'
metadata = {
d1: date,
d2: time,
d3: venue
}
// or edit as and when required. Upto three fields.
}
}
type = 'sm/md/lg/xl' // by default it is md
headingTop = {true/flase} // To set heading above the image
heading = {true/false} // display heading
metadata = {true/false} // display metadata
text = {true/fasle} // display text
/>

<!-- use custom class to override css -->
