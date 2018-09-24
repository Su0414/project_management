# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) 
        User has_many Tasks
- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User)
        Task belongs_to User, Task belongs_to Project
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients)
        User has_many Projects through Tasks
- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity)
        task.completed_at
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)
        User validations for email
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
        Project.recent
        Task.pending
- [x] Include signup (how e.g. Devise)
- [x] Include login (how e.g. Devise)
- [x] Include logout (how e.g. Devise)
- [x] Include third party signup/login (how e.g. Devise/OmniAuth)
            Github
- [x] Include nested resource show or index (URL e.g. users/2/recipes)
        users/1/tasks
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients)
        projects/1/tasks/1
- [x] Include form display of validation errors (form URL e.g. /recipes/new)
        projects/1/tasks/1

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [ ] Views use helper methods if appropriate
- [x] Views use partials if appropriate