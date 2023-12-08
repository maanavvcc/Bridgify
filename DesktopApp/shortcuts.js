
const shortcutList = document.getElementById('shortcut-list');
const shortcutSelector = document.getElementById('shortcut-selection');
      
const LBLaddShortcut =document.getElementById('lbl-add-shortcut');
const LBLeditShortcut =document.getElementById('lbl-edit-shortcut');

const BTNaddShortcut =document.getElementById('btn-add-shortcut');
const BTNeditShortcut =document.getElementById('btn-edit-shortcut');
const BTNremoveShortcut =document.getElementById('btn-remove-shortcut');


const shortcutName = document.getElementById('shortcut-name');
const shortcutDesc = document.getElementById('shortcut-desc');
const shortcutType = document.getElementById('shortcut-type');
const shortcutContext = document.getElementById('shortcut-context');
 
changeEditMode(isEditing = false);
window.electron.getNames().then((value) => dispShortcuts(value));

function dispShortcuts(shortcuts)
{
    console.log(shortcuts);
    shortcutSelector.innerHTML = "<option value='add-shortcut'>Add Shortcut</option>" + shortcuts.map((e) => {
        temp = "<option value='" + e.id + "'>" + e.name + "</option>";
        return temp;
    }).join();
    shortcutList.innerHTML = shortcuts.map((e) => {
        temp = e.id.toString() + ", " + e.name + ", " + e.desc + ", " + e.type + ", " + e.context;
        return temp;
    }).join("<br />");
}

function shortcutChange()
{
    if (shortcutSelector.value == 'add-shortcut')
    {
        resetInputFields();
        changeEditMode(isEditing = false);
        return;
    }
    window.electron.getShortcut(shortcutSelector.value).then((value) => updateShortcutFields(value));
}

function updateShortcutFields(shortcut) 
{
    shortcutName.value = shortcut.name;
    shortcutDesc.value = shortcut.desc;
    shortcutType.value = shortcut.type;
    if (shortcut.type != 'script')
    {
        shortcutContext.value = shortcut.context;
    }
    changeEditMode(isEditing = true);
}

function changeEditMode(isEditing)
{
    if (isEditing)
    {
        LBLaddShortcut.hidden = true;
        LBLeditShortcut.hidden = false;
        BTNaddShortcut.hidden = true;
        BTNeditShortcut.hidden = false;
        BTNremoveShortcut.hidden = false;
    }
    else
    {
        LBLaddShortcut.hidden = false;
        LBLeditShortcut.hidden = true;
        BTNaddShortcut.hidden = false;
        BTNeditShortcut.hidden = true;
        BTNremoveShortcut.hidden = true;
    }
}

function resetConnection() {
    window.electron.changeWindow('change-view-disconnect');
} 

function addShortcut() 
{
    console.log('Adding ' + shortcutName + ' to shortcut list...');
    window.electron.addShortcut(shortcutName.value, shortcutDesc.value, shortcutType.value, shortcutContext.value);
            
    resetInputFields();

    window.electron.getNames().then((value) => dispShortcuts(value));
} 

function editShortcut()
{
    id = shortcutSelector.value;
    console.log('Editing shortcut by id: ' + id + ' to database...');
    window.electron.editShortcut(id, shortcutName.value, shortcutDesc.value, shortcutType.value, shortcutContext.value);

    resetInputFields();

    window.electron.getNames().then((value) => dispShortcuts(value));
}

function removeShortcut()
{
    id = shortcutSelector.value;
    console.log('Removing shortcut by id: ' + id + ' from database...');
    window.electron.removeShortcut(id);

    resetInputFields();

    window.electron.getNames().then((value) => dispShortcuts(value));
}

function resetInputFields()
{
    //reset input fields to default values
    shortcutName.value = '';
    shortcutDesc.value = '';
    shortcutType.value = 'script';
    shortcutContext.value = '';
}

function updateMobile()
{
    
}