# pack
simple builder based webpack

# install
1. `npm i @redbuck/pack -g`

## usage
1. `mkdir test && cd test`
2. `pack init test`
3. `pack dev`

## command
### init
> `pack init <project-name> [template-name]`

pack will fetch template from [git](https://github.com/xty1992a/template).
if folder is not empty and not include sub folder that name same as project-name, program will mkdir by project-name.
if it`s empty and folder name is same as project-name, remote template will fill this folder.

### dev
> `pack dev`
start dev-server.
