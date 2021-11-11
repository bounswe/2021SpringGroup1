<details>
<summary><strong> GITHUB PROJECT WORKING COMMANDS </strong></summary>

* Create your branch with the name which describes your process.
* git clone https://github.com/Defimec/Deximec_Frontend
* git pull origin dev  
* git checkout -b "Your Branch Name"
* --AFTER MAKING SAME CHANGES
* git status
* git add .
* git commit -m "Your Commit Messages" (Commit before pull from dev to avoid code lose)
* git pull origin dev
* git add .
* git commit -m "Your Commit Messages" (Commit again to update previous commit)
* git push origin "Your Branch Name"
* FROM GITHUB, Merge request to dev. NOT MASTER
  
</details>


<details>
<summary><strong> USEFULL GIT COMMANDS </strong></summary>

* git status = See changes
* git branch = See branches in your computer (branch you are working on is green)
* git branch "X" = Create a branch "X" in your computer
* git checkout -b "X" -> Create and Switch to branch "X"
* git switch "X" -> Switch to branch "X".
* git pull origin "Y" -> Brings changes from branch "Y" to the current branch you are working on
* git add . = Add all changes in code to stage
* git status = See all changes (stages are green, others are red)
* git commit -m "Fixing TopHeaderComponent" = Adding a commit message
* git push origin "X" = Pushing to branch "X"
* git reset HEAD~1 = Reset your local git commit
  
  </details>
  
  
  <details>
<summary><strong> PROJECT RULES </strong></summary>
  
* Use yarn. For the first time to use yarn.
  * sudo npm install --global yarn
  * watchman watch-del-all && rm -rf yarn.lock && rm -rf node_modules && yarn && yarn start --reset-cache
* We are using Functional Components
* Components should take props, and you should assign props like this.
  * const NotificationCard = (props) => {const {firstName, lastName, profilePhoto} = props;} 

  
</details>
