# FCQ Data Analysis for 2014

```
var data = loader.json('examples/fcq/fcq.2014.json', {multiLines: true})
var fields = _.keys(data[0]).join(', ')
```

There are {{data.length}} records in this dataset. The fields are _{{fields}}_.

The first 3 records look like

```
viz.list(data.slice(0,3))
```

## Instructors

```
var names = _.pluck(data, 'insname1')
    .concat(_.pluck(data, 'insname2'))

var unique_names = _.unique(_.compact(names))
```

There are {{unique_names.length}} unique instructor names. Below are 5 of these names.

```
viz.list(unique_names.slice(0,5))
```

## Courses

```
var titles = _.compact(_.pluck(data, 'CourseTitle'))
var unique_titles = _.unique(titles)
```

Based on course titles, there are {{unique_titles.length}} unique courses.

```
var groups = _.groupBy(data, 'CourseTitle')
var v = _.max(groups, 'length')
var x = _.sum(_.map(_.pluck(v, 'N_ENROLL'),Number))
```

The course with the most number of sections is __{{ v[0].CourseTitle}}__, which has __{{ v.length }}__ sections. Across all the sections, this course has a total of __{{x}}__ students.

```
var c = _.max(data, 'N_ENROLL')
```

The largest section is __{{c.CourseTitle}}: {{c.Section}}__ that has __{{c.N_ENROLL}}__ students enrolled.

```
var highest_course_rating = _.max(_.pluck(data, 'AvgCourse'))
```

The highest average course rating is {{highest_course_rating}}.

```
var sorted = _.sortBy(data, 'AvgCourse')
var top5 = sorted.reverse().slice(0,5)
```
The highested rated courses are

```
viz.list(_.map(top5, _.partialRight(_.pick,['CourseTitle', 'AvgCourse','N_ENROLL'])))
```

