

var myApp = angular.module("myApp", []);
myApp.service("ContactService" , function(){
	var uid = 1;
	var contacts = [{
		  'id' : 0,
				 'name' : 'Steve John',
				 'response' : 'Hello!'}];	
    
    
	function contactResponse(m1) {
    
    var m2 = 'Hi';
    if (contacts[m1].name.toLowerCase().includes('hello') || contacts[m1].name.toLowerCase().includes('hi') || contacts[m1].name.toLowerCase().includes('hey')) {
        m2 = 'Hello! How are you today??';
    }
    else if (contacts[m1].name.toLowerCase().includes('good') && !contacts[m1].name.toLowerCase().includes('not good') && !contacts[m1].name.toLowerCase().includes('goodbye') || contacts[m1].name.toLowerCase().includes('not bad') || contacts[m1].name.toLowerCase().includes('okay') || contacts[m1].name.toLowerCase().includes('perfect') || contacts[m1].name.toLowerCase().includes('brilliant') || contacts[m1].name.toLowerCase().includes('great')) {
        m2 = 'That is good to hear.';
    }
    else if (contacts[m1].name.toLowerCase().includes('bad') || contacts[m1].name.toLowerCase().includes('not good') || contacts[m1].name.toLowerCase().includes('terrible') || contacts[m1].name.toLowerCase().includes('awful') || contacts[m1].name.toLowerCase().includes('atrocious') ) {
        m2 = 'I am sorry to hear that.';
    }
    else if (contacts[m1].name.toLowerCase().includes('love')) {
        m2 = 'Then it is mutual ;)';
    }
    else if (contacts[m1].name.toLowerCase().includes('tell me a joke')) {
        m2 = 'What do you call two bananas? A pair of slippers!! LOL';
    }
    else if (contacts[m1].name.toLowerCase().includes('adios') || contacts[m1].name.toLowerCase().includes('bye')) {
        m2 = 'See ya!!';
    }
    else {
            
    }
    
    contacts[m1].response = m2;
    }
	// Save Service for sving new contact and saving existing edited contact.
	this.save = function(contact)  
	{
        
        var index = 0;
		if(contact.id == null)                       
		{
        
            if (uid == 1) {
                delete(0); 
            }
            contact.id = uid++;
            contacts.push(contact);
            index = contact.id;
            
		}
		else
		{
			for(var i in contacts)
			{
				if(contacts[i].id == contact.id)
				{
					contacts[i] = contact;
                    index = i;
				}
			}
            
		}
        contactResponse(index);
        
        
	};
	
	// serach for a contact
	
	this.get = function(id)
	{
		for(var i in contacts )
		{
			if( contacts[i].id == id)
			{
				return contacts[i];
			}
		}
	};
	
	//Delete a contact
	this.delete = function(id)
	{
		for(var i in contacts)
			{
				if(contacts[i].id == id)
				{
					contacts.splice(i,1);
				}
			}
	};	
	//Show all contacts
	this.list = function()
	{
		return contacts;
	}	;	
});

////Controller area .....
	
myApp.controller("ContactController" , function($scope , ContactService){
    console.clear();
    
    $scope.ifSearchUser = false;
    $scope.title ="List of Messages";
    
		$scope.contacts = ContactService.list();
		
		$scope.saveContact = function()
		{
		  console.log($scope.newcontact);
		  if($scope.newcontact == null || $scope.newcontact == angular.undefined)
		  return;
			ContactService.save($scope.newcontact);
			$scope.newcontact = {};
		};		
		$scope.delete = function(id)
		{
			ContactService.delete(id);
			if($scope.newcontact != angular.undefined && $scope.newcontact.id == id)
				{
					$scope.newcontact = {};
				}
		};		
		$scope.edit = function(id)
		{
			$scope.newcontact = angular.copy(ContactService.get(id));
		};	
		$scope.searchUser = function(){
		  if($scope.title == "List of Messages"){
		    $scope.ifSearchUser=true;
		    $scope.title = "Back";
		  }
		  else
		  {
		    $scope.ifSearchUser = false;
		    $scope.title = "List of Messages";
		  }		  
		};
});

