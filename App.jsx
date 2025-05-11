import './styles.css';
import React, { useState } from 'react';

// Header component
function Header() {
    return (
        <header style={{ padding: '1.5rem 2rem', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Expense Splitter</h1>
        </header>
    );
}

// Login component
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '') {
            alert('Please enter a username');
            return;
        }
        onLogin(username.trim());n
    };

    return (
        <div style={{ maxWidth: '500px', width: '90vw', padding: '2.5rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,0,0,0.15)', backgroundColor: 'white' }}>
            <h1 style={{ textAlign: 'center', color: 'black', marginBottom: '2rem', fontWeight: '700', fontSize: '2rem' }}> Welcome to SplitMate </h1>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', color: 'black' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '1.1rem', color: 'black' }}>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '0.65rem', marginTop: '0.35rem', fontSize: '1rem' }} placeholder="Enter username" />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '1.1rem', color: 'black' }}>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.65rem', marginTop: '0.35rem', fontSize: '1rem' }} placeholder="Enter password" />
                </div>
                <button type="submit" style={{ width: '100%', padding: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.2rem' }}> Login </button>
            </form>
        </div>
    );
}

// GroupMembers component
function GroupMembers({ members, addMember, removeMember }) {
    const [newMember, setNewMember] = useState('');

    const handleAddMember = () => {
        const trimmed = newMember.trim();
        if (trimmed && !members.includes(trimmed)) {
            addMember(trimmed);
            setNewMember('');
        }
    };

    return (
        <section style={{ marginBottom: '1.5rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'white', color: 'black' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Group Members</h2>
            <ul style={{ fontSize: '1.1rem' }}>
                {members.map((member, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        {member}
                        <button onClick={() => removeMember(member)} style={{ marginLeft: '1rem', color: 'red', fontSize: '1rem', cursor: 'pointer', background: 'none', border: 'none' }}>Remove</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="New member name"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                style={{ marginRight: '0.75rem', fontSize: '1rem', padding: '0.5rem' }}
            />
            <button onClick={handleAddMember} style={{ fontSize: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Add Member</button>
        </section>
    );
}

// ExpenseForm component
function ExpenseForm({ members, addExpense }) {
    const [title, setTitle] = useState('');
    const [payer, setPayer] = useState('');
    const [amount, setAmount] = useState('');
    const [participants, setParticipants] = useState([]);

    const toggleParticipant = (member) => {
        if (participants.includes(member)) {
            setParticipants(participants.filter(m => m !== member));
        } else {
            setParticipants([...participants, member]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const amt = parseFloat(amount);
        if (!title.trim() || !payer || isNaN(amt) || amt <= 0 || participants.length === 0) {
            alert('Please fill all fields correctly');
            return;
        }
        addExpense({ title: title.trim(), payer, amount: amt, participants });
        setTitle('');
        setPayer('');
        setAmount('');
        setParticipants([]);
    };

    return (
        <section style={{ marginBottom: '1.5rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'white', color: 'black' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Add Expense</h2>
            <form onSubmit={handleSubmit} style={{ fontSize: '1.1rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                    <label>Title: </label>
                    <input type="text" placeholder="Expense description" value={title} onChange={e => setTitle(e.target.value)} style={{ fontSize: '1rem', padding: '0.4rem', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                    <label>Payer: </label>
                    <select value={payer} onChange={e => setPayer(e.target.value)} style={{ fontSize: '1rem', padding: '0.4rem', width: '100%' }}>
                        <option value="">Select payer</option>
                        {members.map((member, idx) => (
                            <option key={idx} value={member}>{member}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                    <label>Amount: </label>
                    <input type="number" step="0.01" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={{ fontSize: '1rem', padding: '0.4rem', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                    <label>Participants: </label>
                    <div>
                        {members.map((member, idx) => (
                            <label key={idx} style={{ marginRight: '1rem', fontSize: '1rem' }}>
                                <input type="checkbox" checked={participants.includes(member)} onChange={() => toggleParticipant(member)} style={{ marginRight: '0.3rem' }} />
                                {member}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" style={{ fontSize: '1.2rem', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '6px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>Add Expense</button>
            </form>
        </section>
    );
}

// ExpenseList component
function ExpenseList({ expenses }) {
    return (
        <section style={{ marginBottom: '1.5rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'white', color: 'black' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Expenses</h2>
            {expenses.length === 0 ? (
                <p style={{ fontSize: '1.1rem' }}>No expenses added yet.</p>
            ) : (
                <ul style={{ fontSize: '1.1rem' }}>
                    {expenses.map((expense, index) => (
                        <li key={index} style={{ marginBottom: '0.75rem' }}>
                            <strong>{expense.title}</strong> — {expense.payer} paid ${expense.amount.toFixed(2)} for {expense.participants.join(', ')}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

// SplitSummary component
function SplitSummary({ expenses, members }) {
    const balances = {};
    members.forEach(m => balances[m] = 0);

    expenses.forEach(exp => {
        const splitAmount = exp.amount / exp.participants.length;
        balances[exp.payer] += exp.amount;
        exp.participants.forEach(p => { balances[p] -= splitAmount; });
    });

    return (
        <section style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'white', color: 'black' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Split Summary</h2>
            {members.length === 0 ? (
                <p style={{ fontSize: '1.1rem' }}>Add group members to see the split summary.</p>
            ) : (
                <ul style={{ fontSize: '1.1rem' }}>
                    {members.map((member, idx) => {
                        const balance = balances[member];
                        let textColor = 'black';
                        let statusText = '';
                        if (balance > 0) {
                            textColor = 'green';
                            statusText = is owed $${balance.toFixed(2)};
                        } else if (balance < 0) {
                            textColor = 'red';
                            statusText = owes $${Math.abs(balance).toFixed(2)};
                        } else {
                            statusText = 'is settled up';
                        }
                        return (
                            <li key={idx} style={{ color: textColor, marginBottom: '0.5rem' }}>
                                <strong>{member}</strong> {statusText}
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

// Main App component
function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [members, setMembers] = useState(['Sravani', 'Sree', 'Deepthi']);
    const [expenses, setExpenses] = useState([]);
    const [activeSection, setActiveSection] = useState('group');

    const addMember = (name) => {
        setMembers([...members, name]);
    };

    const removeMember = (name) => {
        setMembers(members.filter(m => m !== name));
    };

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const handleLogin = (username) => {
        setLoggedInUser(username);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setActiveSection('group');
    };

    if (!loggedInUser) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                color: 'black',
                padding: '1rem',
                boxSizing: 'border-box'
            }}>
                <Login onLogin={handleLogin} />
            </div>
        );
    }

    return (
        <div style={{
            height: '100vh',
            backgroundColor: 'white',
            color: 'black',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
            overflowY: 'auto'
        }}>
            <Header />
            <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '1.5rem', textAlign: 'right', fontSize: '1.2rem' }}>
                Welcome, <strong>{loggedInUser}</strong>!
                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: '1.5rem',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        borderRadius: '4px',
                        backgroundColor: '#ddd',
                        border: 'none'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Navigation Buttons */}
            <nav style={{ width: '100%', maxWidth: '1000px', marginBottom: '2rem', textAlign: 'center' }}>
                <button
                    onClick={() => setActiveSection('group')}
                    style={{
                        marginRight: '1.5rem',
                        padding: '0.7rem 1.5rem',
                        cursor: 'pointer',
                        backgroundColor: activeSection === 'group' ? '#007bff' : '#eee',
                        color: activeSection === 'group' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        minWidth: '170px'
                    }}
                    aria-label="Show Group Members"
                >
                    Group Members
                </button>
                <button
                    onClick={() => setActiveSection('expense')}
                    style={{
                        marginRight: '1.5rem',
                        padding: '0.7rem 1.5rem',
                        cursor: 'pointer',
                        backgroundColor: activeSection === 'expense' ? '#007bff' : '#eee',
                        color: activeSection === 'expense' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        minWidth: '170px'
                    }}
                    aria-label="Add Expense"
                >
                    Add Expense
                </button>
                <button
                    onClick={() => setActiveSection('summary')}
                    style={{
                        padding: '0.7rem 1.5rem',
                        cursor: 'pointer',
                        backgroundColor: activeSection === 'summary' ? '#007bff' : '#eee',
                        color: activeSection === 'summary' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        minWidth: '170px'
                    }}
                    aria-label="Expense Split Summary"
                >
                    Expense Split Summary
                </button>
            </nav>

            {/* Section Container */}
            <main style={{ width: '100%', maxWidth: '1000px' }}>
                {activeSection === 'group' && (
                    <GroupMembers members={members} addMember={addMember} removeMember={removeMember} />
                )}
                {activeSection === 'expense' && (
                    <>
                        <ExpenseForm members={members} addExpense={addExpense} />
                        <ExpenseList expenses={expenses} />
                    </>
                )}
                {activeSection === 'summary' && (
                    <SplitSummary expenses={expenses} members={members} />
                )}
            </main>
        </div>
    );
}

export default App;
