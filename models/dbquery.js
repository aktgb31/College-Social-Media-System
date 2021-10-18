// Message Id (PK) // Auto Increment int
// Sender Id int
// Receiver ID int
// Content text
// Time datetime

const message = db.define(
    "message",
    {
        MessageId: {
            typeof: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        SenderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        ReceiverId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        hashedcontent: { type: DataTypes.STRING, allowNull: false },
        datetime: { type: DataTypes.STRING, allowNull: false },
    },
    {
        timestamps: false,
    }
);


