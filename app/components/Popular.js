import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function RepoGrid({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, html_url, owner: { avatar_url, login }, stargazers_count }, index) => {
        return (
          <li key={name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <a href={html_url} target='_blank' >
                  <img
                    className='avatar'
                    src={avatar_url}
                    alt={`Avatar for ${login}`}
                  />
                </a>
              </li>
              <li><a href={html_url} target='_blank'>{name}</a></li>
              <li>@{login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}



function SelectLanguage({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'CSS', 'Python', 'CPP', 'Rust'];
  return (
    <ul className="languages">
      {languages.map(
        (language) => {
          return (
            <li
              style={language === selectedLanguage ? { color: '#d0021b' } : null}
              onClick={() => onSelect(language)}
              key={language}>
              {language}
            </li>
          )
        })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

class Popular extends React.Component {

  state = {
    selectedLanguage: 'All',
    repos: null,
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async (language) => {
    this.setState(() => ({
      selectedLanguage: language,
      repos: null,
    }));

    const repos = await fetchPopularRepos(language);
    this.setState(() => ({ repos }));
  }

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage} />
        {!repos
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

export default Popular;