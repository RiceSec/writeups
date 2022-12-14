```py
from pwn import *
from collections import defaultdict
import time

CURR = 'X'
EMPTY = 'O'
WALL = '#'

def graphify(grid):
	m, n = len(grid), len(grid[0])

	graph = defaultdict(set)
	for r, row in enumerate(grid):
		for c, cell in enumerate(row):
			for dr, dc in [(0, -1), (0, 1), (1, 0)]:
				if 0 <= r + dr < m and 0 <= c + dc < n:
					if grid[r + dr][c + dc] == EMPTY:
						graph[(r, c)].add((r + dr, c + dc))
						# graph[(r + dr, c + dc)].add((r, c))

	return graph


def bfs(graph, node):
	q = [node]
	d = defaultdict(lambda: float('inf'))

	d[node] = 0
	visited = { node: True }
	anc = { node: node }

	while q:
		curr = q.pop()
		# if curr == (m - 1, n - 1):
		# 	break

		visited[curr] = True
		for nbr in graph[curr]:
			d[nbr] = min(d[nbr], d[curr] + 1)
			if nbr not in visited:
				anc[nbr] = curr
				q.append(nbr)

	return anc

def traceback(anc, start, goal=(10, 19)):
	curr = goal
	directions = []
	while curr != start:
		new = anc[curr]
		if curr[0] > new[0]:
			directions.append('V')
		elif curr[1] > new[1]:
			directions.append('>')
		elif curr[1] < new[1]:
			directions.append('<')
		else:
			print('wtf')
			break

		curr = new
	return directions[::-1]

rem = remote('chals.tuctf.com', 30204)

rem.recvline()
rem.recvline()
rem.recvline()

j = 0
while True:
	lines = []

	grid = rem.recvuntil(b'Move: ')
	grid = grid.replace(b'Move: ', b'').strip()
	grid = grid.split(b'\n')
	print(grid)
	grid = list(map(lambda b: b.decode('utf-8'), grid))
	print(j, grid)
	graph = graphify(grid)
	start = None
	b_most_r_most = (0, 0)
	for r, row in enumerate(grid):
		for c, cell in enumerate(row):
			if cell == CURR:
				start = (r, c)
			if cell in [CURR, EMPTY]:
				b_most_r_most = (r, c)

	print('start, goal', start, b_most_r_most)
	ancs = bfs(graph, start)
	dirs = traceback(ancs, start, b_most_r_most)

	if len(dirs) == 0:
		rem.sendline()

	for i, direction in enumerate(dirs):
		rem.sendline(direction.encode('utf-8'))
		if i < len(dirs) - 1:
			try:
				buf = b''
				while (l := rem.recvline())[0] in [b'X', b'O', b'#']:
					buf += l
				# print(buf)
			except:
				print('ugh')
				print(rem.recvall())
				print(rem.recvline())
				print(rem.recvline())
				print(rem.recvline())
				print(rem.recvline())
				break
		else:
			try:
				buf = b''
				while not (l := rem.recvline()) != b'':
					buf += l
				rem.recvuntil(b'next level...\n\n').decode('utf-8')
			except:
				print('aaaaaaaaaa')
				print(rem.recvline())
				print(rem.recvline())
				print(rem.recvline())
				print(rem.recvline())
				print(rem.recvall())
				break

	print('bingo')
	j += 1
	if j == 50:
		break

print('done')
print(rem.recvline())
print(rem.recvline())
print(rem.recvline())
print(rem.recvline())
print(rem.recvall())
```
