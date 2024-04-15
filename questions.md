1. What is the difference between Component and PureComponent? 
Give an example where it might break my app. 

The difference is that Pure Components don't rerender when the value of props and state has been updated with the same values by providing shouldComponentUpdate method.
It can break your app if you use it with mutable objects/array, because it performs by shallow comparison.

2. Context + ShouldComponentUpdate might be dangerous. Why is 
that? 

ShouldComponentUpdate could break context propagation

3. Describe 3 ways to pass information from a component to its 
PARENT.

a. Function handler for child, passed from parent, that returns result.
b. Passing setState from parent directly
c. Ref

4. Give 2 ways to prevent components from re-rendering. 

React.Memo, PureComponent, useMemo, useCallback, Reselect library

5. What is a fragment and why do we need it? Give an example where it might break my app. 

We need it, because we can use multiple elements inside fragment without creating extra DOM node like 'div'
Sometimes fragments can break styles, because it's node DOM node

6. Give 3 examples of the HOC pattern. 

React.Memo, mapStateToProps/mapDispatchToProps, withRouter

7. What's the difference in handling exceptions in promises, 
callbacks and async…await?

a. promises use non-static method 'then' and 'catch'
b. we can create promise and handle callback exception the same like promise
c. with async...await we use 'try...catch'

8. How many arguments does setState take and why is it async. 

a. 2 arguments: state and callback called after state is updated
b. setState is async, because it expensive operation, also they can be batched if we have a couple setState in a row

9. List the steps needed to migrate a Class to Function 
Component.

a. use function instead of class
b. replace state with useState, lifecycle methods with useEffect
c. some other small specifics, because of 2 different entities

10. List a few ways styles can be used with components. 

css-in-js like styled components
inline styles
import usual css, css modules
some libraries like bootstrap/mui
tailwindcss

11. How to render an HTML string coming from the server.

Using dangerouslySetInnerHTML. But we should use it only with trusted data.
