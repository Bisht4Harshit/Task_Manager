import { getId, getInitials } from '../utils/user';

export default function Profile({ user, members }) {
  const people = members.length ? members : [user];

  return (
    <section className="panel">
      <div className="panel-title">
        <h2>{members.length ? 'Team Members' : 'Signed-in User'}</h2>
        <span>{members.length ? `${members.length} people` : user.role}</span>
      </div>

      <div className="member-grid">
        {people.map((member) => (
          <article className="member" key={getId(member)}>
            <div className="avatar">{getInitials(member)}</div>
            <div>
              <strong>{member.username || 'User'}</strong>
              <span>{member.email}</span>
            </div>
            <em>{member.role}</em>
          </article>
        ))}
      </div>
    </section>
  );
}
