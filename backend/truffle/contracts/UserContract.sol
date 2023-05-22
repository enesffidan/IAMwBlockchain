pragma solidity ^0.8.0;

contract UserContract {
    struct User {
        string username;
        string password;
    }

    // mapping(address => User) public users;
    User[] users;

    event UserCreated(address indexed userAddress, string username);
    event UserUpdated(address indexed userAddress, string field, string value);

    function createUser(
        string memory _username,
        string memory _password
    ) public {
        // require(bytes(users[0].username).length == 0, "User already exists");

        // users[msg.sender] = User({username: _username, password: _password});
        users.push(User(_username, _password));
        emit UserCreated(msg.sender, _username);
    }

    function updateUser(
        string memory _username,
        string memory _password
    ) public {
        require(bytes(users[0].username).length > 0, "User does not exist");

        users[0].username = _username;
        users[0].password = _password;

        emit UserUpdated(msg.sender, "username", _username);
        emit UserUpdated(msg.sender, "password", _password);
    }

    function getUsername() public view returns (string memory) {
        return users[0].username;
    }

    function getPassword() public view returns (string memory) {
        return users[0].password;
    }
}

contract UserFactory {
    UserContract[] public userContracts;

    function createUserContract(
        string memory _username,
        string memory _password
    ) external {
        UserContract userContract = new UserContract();

        userContract.createUser(_username, _password);

        // emit UserCreated(user, users.length);

        userContracts.push(userContract);

        // return address(userContract);
    }

    function getUsername(address _address) public view returns (string memory) {
        UserContract userContract;

        for (uint i = 0; i < userContracts.length; i++) {
            if (_address == address(userContracts[i])) {
                userContract = userContracts[i];
            }
        }

        return userContract.getUsername();

        // emit UserCreated(user, users.length);

        // userContracts.push(userContract);
    }

    function getPassword(address _address) public view returns (string memory) {
        UserContract userContract = userContracts[0];

        for (uint i = 0; i < userContracts.length; i++) {
            if (_address == address(userContracts[i])) {
                userContract = userContracts[i];
            }
        }

        return userContract.getPassword();

        // emit UserCreated(user, users.length);

        // userContracts.push(userContract);
    }

    function getContractAddress() public view returns (address) {

        return address(userContracts[userContracts.length - 1]);

        // emit UserCreated(user, users.length);

        // userContracts.push(userContract);
    }

    // event UserCreated(User user, uint256 index);
}
